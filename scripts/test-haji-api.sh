#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing .env file at $ENV_FILE" >&2
  exit 1
fi

get_env() {
  local key="$1"
  local line
  line="$(grep -E "^[[:space:]]*${key}=" "$ENV_FILE" | tail -n 1 || true)"
  if [[ -z "$line" ]]; then
    return 1
  fi
  local value="${line#*=}"
  value="${value%\"}"
  value="${value#\"}"
  value="${value%\'}"
  value="${value#\'}"
  printf '%s' "$value"
}

for key in HAJI_API_URL HAJI_HOST HAJI_API_KEY HAJI_ENDPOINT_INFO HAJI_USER_AGENT; do
  if ! get_env "$key" > /dev/null; then
    echo "Missing env var: $key" >&2
    exit 1
  fi
done

HAJI_API_URL="$(get_env HAJI_API_URL)"
HAJI_HOST="$(get_env HAJI_HOST)"
HAJI_API_KEY="$(get_env HAJI_API_KEY)"
HAJI_ENDPOINT_INFO="$(get_env HAJI_ENDPOINT_INFO)"
HAJI_USER_AGENT="$(get_env HAJI_USER_AGENT)"

NO_PORSI="${1:-3000009112}"
URL="${HAJI_API_URL}${HAJI_ENDPOINT_INFO}"
BODY="{\"no_porsi\":\"${NO_PORSI}\"}"

echo "POST ${URL}"
echo "Body: ${BODY}"

curl -sS --compressed -m 15 --fail-with-body \
  -w '\nHTTP %{http_code} in %{time_total}s\n' \
  -X POST "$URL" \
  -H 'accept: application/json' \
  -H 'content-type: application/json; charset=utf-8' \
  -H "host: ${HAJI_HOST}" \
  -H "user-agent: ${HAJI_USER_AGENT}" \
  -H "x-key: ${HAJI_API_KEY}" \
  --data "$BODY"
