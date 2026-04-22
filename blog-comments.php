<?php
declare(strict_types=1);

session_start();

header("Content-Type: application/json; charset=UTF-8");

$topicLabels = array(
    "planejamento" => "Planejamento",
    "look" => "Look e estilo",
    "direcao" => "Direção leve",
    "entrega" => "Uso das fotos",
);

$intentLabels = array(
    "duvida" => "Dúvida",
    "experiencia" => "Experiência",
    "sugestao" => "Sugestão",
);

$seedComments = array(
    array(
        "id" => "seed-1",
        "author" => "Mariana",
        "topic" => "planejamento",
        "intent" => "duvida",
        "message" => "Estou começando a organizar o ensaio e queria entender o quanto vale levar referências antes do primeiro contato. Ter uma orientação assim no blog ajuda muito.",
        "likes" => 4,
        "createdAt" => "2026-04-18T09:30:00.000Z",
        "replyToAuthor" => "",
        "replyToTopic" => "",
    ),
    array(
        "id" => "seed-2",
        "author" => "Felipe",
        "topic" => "look",
        "intent" => "experiencia",
        "message" => "Separar uma troca extra fez diferença no meu ensaio. Acho ótimo quando o blog já orienta isso de forma simples, porque evita ansiedade no dia.",
        "likes" => 7,
        "createdAt" => "2026-04-18T13:10:00.000Z",
        "replyToAuthor" => "",
        "replyToTopic" => "",
    ),
    array(
        "id" => "seed-3",
        "author" => "Camila",
        "topic" => "direcao",
        "intent" => "duvida",
        "message" => "Tenho receio de ficar artificial nas fotos. Ver esse tipo de explicação sobre direção leve me deixa mais segura, mas queria saber quanto tempo leva até a pessoa relaxar durante a sessão.",
        "likes" => 3,
        "createdAt" => "2026-04-19T08:50:00.000Z",
        "replyToAuthor" => "",
        "replyToTopic" => "",
    ),
    array(
        "id" => "seed-4",
        "author" => "Laura",
        "topic" => "planejamento",
        "intent" => "experiencia",
        "message" => "Respondendo à Mariana: no meu caso ajudou muito chegar com poucas referências, mas bem alinhadas. O atendimento ficou mais claro e o ensaio fez mais sentido.",
        "likes" => 5,
        "createdAt" => "2026-04-19T11:15:00.000Z",
        "replyToAuthor" => "Mariana",
        "replyToTopic" => "planejamento",
    ),
    array(
        "id" => "seed-5",
        "author" => "Renato",
        "topic" => "entrega",
        "intent" => "sugestao",
        "message" => "Seria legal ter mais conteúdo sobre seleção final das fotos e uso em portfólio profissional. Esse tema tem bastante valor para quem trabalha com imagem pessoal.",
        "likes" => 2,
        "createdAt" => "2026-04-19T16:25:00.000Z",
        "replyToAuthor" => "",
        "replyToTopic" => "",
    ),
);

function respond(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    exit;
}

function sanitizeLine(string $value): string
{
    $value = strip_tags(trim($value));
    $value = preg_replace("/\s+/u", " ", $value) ?: "";

    return $value;
}

function sanitizeMessage(string $value): string
{
    $value = strip_tags(trim($value));
    $value = preg_replace("/\r\n?/", "\n", $value) ?: "";
    $value = preg_replace("/\n{3,}/", "\n\n", $value) ?: "";

    return trim($value);
}

function normalizeTopic(string $topic, array $topicLabels): string
{
    return array_key_exists($topic, $topicLabels) ? $topic : "planejamento";
}

function normalizeIntent(string $intent, array $intentLabels): string
{
    return array_key_exists($intent, $intentLabels) ? $intent : "duvida";
}

function normalizeComment(array $comment, array $topicLabels, array $intentLabels): ?array
{
    if (empty($comment["id"]) || empty($comment["author"]) || empty($comment["message"])) {
        return null;
    }

    return array(
        "id" => sanitizeLine((string) $comment["id"]),
        "author" => sanitizeLine((string) $comment["author"]),
        "topic" => normalizeTopic((string) ($comment["topic"] ?? ""), $topicLabels),
        "intent" => normalizeIntent((string) ($comment["intent"] ?? ""), $intentLabels),
        "message" => sanitizeMessage((string) $comment["message"]),
        "likes" => max(0, (int) ($comment["likes"] ?? 0)),
        "createdAt" => !empty($comment["createdAt"]) ? (string) $comment["createdAt"] : gmdate("c"),
        "replyToAuthor" => !empty($comment["replyToAuthor"]) ? sanitizeLine((string) $comment["replyToAuthor"]) : "",
        "replyToTopic" => !empty($comment["replyToTopic"]) ? normalizeTopic((string) $comment["replyToTopic"], $topicLabels) : "",
    );
}

function normalizeComments(array $comments, array $topicLabels, array $intentLabels): array
{
    $normalized = array();

    foreach ($comments as $comment) {
        if (!is_array($comment)) {
            continue;
        }

        $entry = normalizeComment($comment, $topicLabels, $intentLabels);

        if ($entry !== null) {
            $normalized[] = $entry;
        }
    }

    usort($normalized, static function (array $left, array $right): int {
        return strtotime($right["createdAt"]) <=> strtotime($left["createdAt"]);
    });

    return $normalized;
}

function readComments(array $seedComments, array $topicLabels, array $intentLabels): array
{
    $sessionComments = $_SESSION["ashade_blog_comments"] ?? null;

    if (!is_array($sessionComments)) {
        $sessionComments = normalizeComments($seedComments, $topicLabels, $intentLabels);
        $_SESSION["ashade_blog_comments"] = $sessionComments;
    }

    return normalizeComments($sessionComments, $topicLabels, $intentLabels);
}

function saveComments(array $comments, array $topicLabels, array $intentLabels): void
{
    $_SESSION["ashade_blog_comments"] = normalizeComments($comments, $topicLabels, $intentLabels);
}

function generateId(): string
{
    try {
        return "comment-" . bin2hex(random_bytes(8));
    } catch (Exception $exception) {
        return "comment-" . uniqid("", true);
    }
}

function stringLength(string $value): int
{
    if (function_exists("mb_strlen")) {
        return mb_strlen($value);
    }

    return strlen($value);
}

function stringSlice(string $value, int $limit): string
{
    if (function_exists("mb_substr")) {
        return mb_substr($value, 0, $limit);
    }

    return substr($value, 0, $limit);
}

$comments = readComments($seedComments, $topicLabels, $intentLabels);
$method = strtoupper((string) ($_SERVER["REQUEST_METHOD"] ?? "GET"));

if ($method === "GET") {
    respond(200, array("comments" => $comments));
}

if ($method !== "POST") {
    respond(405, array("message" => "Método não permitido."));
}

$payload = json_decode((string) file_get_contents("php://input"), true);

if (!is_array($payload)) {
    respond(400, array("message" => "O corpo da requisição está inválido."));
}

$action = sanitizeLine((string) ($payload["action"] ?? "create"));

if ($action === "react") {
    $commentId = sanitizeLine((string) ($payload["id"] ?? ""));
    $updated = false;

    foreach ($comments as &$comment) {
        if ($comment["id"] !== $commentId) {
            continue;
        }

        $comment["likes"] = min(999, (int) $comment["likes"] + 1);
        $updated = true;
        break;
    }
    unset($comment);

    if (!$updated) {
        respond(404, array("message" => "Comentário não encontrado."));
    }

    saveComments($comments, $topicLabels, $intentLabels);
    respond(200, array("comments" => $comments));
}

$author = sanitizeLine((string) ($payload["author"] ?? ""));
$topic = normalizeTopic((string) ($payload["topic"] ?? ""), $topicLabels);
$intent = normalizeIntent((string) ($payload["intent"] ?? ""), $intentLabels);
$message = sanitizeMessage((string) ($payload["message"] ?? ""));
$replyToAuthor = sanitizeLine((string) ($payload["replyToAuthor"] ?? ""));
$replyToTopic = !empty($payload["replyToTopic"]) ? normalizeTopic((string) $payload["replyToTopic"], $topicLabels) : "";

if (stringLength($author) < 2) {
    respond(400, array("message" => "Digite um nome válido para publicar o comentário."));
}

if (stringLength($message) < 12) {
    respond(400, array("message" => "Escreva um comentário um pouco mais completo antes de publicar."));
}

$newComment = array(
    "id" => generateId(),
    "author" => stringSlice($author, 60),
    "topic" => $topic,
    "intent" => $intent,
    "message" => stringSlice($message, 1200),
    "likes" => 0,
    "createdAt" => gmdate("c"),
    "replyToAuthor" => $replyToAuthor !== "" ? stringSlice($replyToAuthor, 60) : "",
    "replyToTopic" => $replyToTopic,
);

array_unshift($comments, $newComment);
$comments = normalizeComments($comments, $topicLabels, $intentLabels);

saveComments($comments, $topicLabels, $intentLabels);

respond(200, array(
    "message" => "Comentário publicado com sucesso.",
    "comment" => $newComment,
    "comments" => $comments,
));
