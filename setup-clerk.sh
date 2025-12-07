#!/bin/bash

# Script para configurar las claves de Clerk
# Uso: bash setup-clerk.sh

echo "=================================================="
echo "  🔐 Configuración de Claves de Clerk"
echo "=================================================="
echo ""
echo "Para obtener tus claves de Clerk:"
echo "1. Ve a https://clerk.com y crea una cuenta"
echo "2. Crea una nueva aplicación"
echo "3. Ve a API Keys en el dashboard"
echo "4. Copia las claves que se muestran"
echo ""
echo "=================================================="
echo ""

# Pedir al usuario las claves
read -p "Ingresa tu PUBLISHABLE KEY (empieza con pk_test_ o pk_live_): " PUBLISHABLE_KEY
read -p "Ingresa tu SECRET KEY (empieza con sk_test_ o sk_live_): " SECRET_KEY

# Validar que las claves no estén vacías
if [ -z "$PUBLISHABLE_KEY" ] || [ -z "$SECRET_KEY" ]; then
    echo "❌ Error: Las claves no pueden estar vacías"
    exit 1
fi

# Validar formato de las claves
if [[ ! $PUBLISHABLE_KEY =~ ^pk_ ]]; then
    echo "❌ Error: La publishable key debe empezar con 'pk_'"
    exit 1
fi

if [[ ! $SECRET_KEY =~ ^sk_ ]]; then
    echo "❌ Error: La secret key debe empezar con 'sk_'"
    exit 1
fi

# Actualizar el archivo .env
cat > .env << EOF
# Contentful Configuration
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_ENVIRONMENT=master

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$PUBLISHABLE_KEY
CLERK_SECRET_KEY=$SECRET_KEY

# Clerk Routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
EOF

echo ""
echo "✅ ¡Claves configuradas exitosamente!"
echo ""
echo "Ahora ejecuta:"
echo "  npm run dev"
echo ""
echo "Y navega a http://localhost:3000/sign-in para probar"
echo ""
