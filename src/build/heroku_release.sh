#!/bin/bash

echo "$HEROKU_API_KEY" | docker login -u "$HEROKU_USERNAME" --password-stdin "$HEROKU_REGISTRY"

docker build --force-rm -t registry.heroku.com/value-investment/web:latest .
docker push registry.heroku.com/value-investment/web:latest

image_id=$(docker inspect registry.heroku.com/value-investment/web:latest --format={{.Id}})
echo Releasing image to Heroku: $image_id

get_msg()
{
cat <<EOF
{
  "updates": [
    {
      "type": "web",
      "docker_image": "$image_id"
    }
  ]
}
EOF
}

curl -n -X PATCH https://api.heroku.com/apps/value-investment/formation \
-d "$(get_msg)" \
-H "Content-Type: application/json" \
-H "Accept: application/vnd.heroku+json; version=3.docker-releases" \
-H "Authorization: Bearer $HEROKU_API_KEY"