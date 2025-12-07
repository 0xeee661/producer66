# 🔍 Guía de Diagnóstico - Clerk Webhook No Funciona

## 📌 Problema Identificado

Los usuarios no se están guardando en la base de datos cuando ingresan con Clerk, y los console.log **NO se están mostrando**.

## 🚨 Causa Probable

**El webhook NO se está ejecutando**, lo que significa que Clerk **NO está enviando eventos** a tu aplicación. Esto puede deberse a:

1. **El webhook NO está configurado en Clerk Dashboard**
2. **La URL del webhook es incorrecta**
3. **El webhook secret (CLERK_WEBHOOK_SECRET) no está configurado**
4. **La aplicación no está accesible públicamente** (Clerk necesita poder llegar a tu servidor)

## ✅ Pasos para Solucionar

### 🔧 Paso 1: Configurar el Webhook en Clerk Dashboard

1. Ve a [Clerk Dashboard](https://dashboard.clerk.com/)
2. Selecciona tu aplicación
3. Ve a **"Webhooks"** en el menú lateral
4. Haz clic en **"+ Add Endpoint"**
5. Necesitas una URL pública. Hay 2 opciones:

#### Opción A: Usar ngrok (Para desarrollo local)

```bash
# Instalar ngrok si no lo tienes
brew install ngrok

# En una terminal, corre tu aplicación
npm run dev

# En OTRA terminal, expón tu puerto local con ngrok
ngrok http 3000
```

Ngrok te dará una URL pública como: `https://xxxx-xx-xx-xxx-xxx.ngrok-free.app`

Usa esta URL para el webhook: `https://xxxx-xx-xx-xxx-xxx.ngrok-free.app/api/webhooks/clerk`

#### Opción B: Desplegar en Vercel o similar

Si ya tienes desplegada la app en Vercel:
- URL del webhook: `https://tudominio.vercel.app/api/webhooks/clerk`

### 🔧 Paso 2: Configurar Eventos en Clerk

En la configuración del webhook, selecciona estos eventos:
- ✅ `user.created`
- ✅ `user.updated`
- ✅ `user.deleted` (opcional)

### 🔧 Paso 3: Copiar el Webhook Secret

1. Después de crear el endpoint, Clerk te mostrará un **Signing Secret**
2. Cópialo (empieza con `whsec_...`)
3. Agrégalo a tu archivo `.env.local`:

```env
CLERK_WEBHOOK_SECRET=whsec_tu_secret_aqui
```

### 🔧 Paso 4: Verificar Variables de Entorno

Asegúrate de tener todas estas variables en tu `.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Clerk Routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xwrjiepxkgyqalsordws.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### 🔧 Paso 5: Reiniciar el Servidor

```bash
# Detén el servidor (Ctrl+C)
# Reinicia
npm run dev
```

### 🔧 Paso 6: Probar el Webhook

1. Ve a Clerk Dashboard → Webhooks
2. Selecciona tu endpoint
3. Haz clic en **"Testing"** o **"Send test event"**
4. Clerk enviará un evento de prueba

**Deberías ver en tu consola:**

```
🚀 ============================================
🚀 WEBHOOK CLERK - INICIO DE EJECUCIÓN
🚀 Timestamp: 2025-12-01T...
🚀 ============================================
📋 Headers recibidos:
  - svix-id: msg_...
  - svix-timestamp: ...
  - svix-signature: ✅ presente
  - webhook-secret configurado: ✅
```

### 🔧 Paso 7: Registrar un Usuario Real

1. **Cierra sesión** en tu app si estás logueado
2. Ve a `/sign-up`
3. Regístrate con un **nuevo email** (debe ser uno que nunca hayas usado)
4. Verifica los logs en tu consola

## 📊 Verificar que Funcionó

### En la Consola del Servidor

Deberías ver:

```
🚀 WEBHOOK CLERK - INICIO DE EJECUCIÓN
📋 Headers recibidos:
  - svix-id: msg_xxxxx
  - svix-signature: ✅ presente
  - webhook-secret configurado: ✅
✅ Webhook verificado correctamente
📨 Tipo de evento: user.created
👤 Datos del usuario:
  - ID: user_xxxxx
  - Email: usuario@ejemplo.com
  - Nombre: Juan
💾 Datos a guardar en Supabase: {...}
✅ Cliente procesado via webhook: ID=1
```

### En Supabase Dashboard

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Table Editor** → **clients**
4. Deberías ver el nuevo usuario registrado

## 🐛 Si Aún No Funciona

### Problema: No ves ningún log

**Causa**: El webhook no se está ejecutando
**Solución**: Revisa que:
- La URL del webhook en Clerk sea correcta
- Ngrok esté corriendo (si es desarrollo local)
- El puerto sea el correcto (3000 por defecto)

### Problema: Ves logs pero dice "Error: no svix headers"

**Causa**: Clerk no está enviando las cabeceras correctas
**Solución**: 
- Verifica que la URL del webhook termine en `/api/webhooks/clerk`
- Revisa que los eventos estén seleccionados en Clerk

### Problema: Error "Error verifying webhook"

**Causa**: El `CLERK_WEBHOOK_SECRET` es incorrecto
**Solución**: 
- Copia nuevamente el secret desde Clerk Dashboard
- Asegúrate de que no tenga espacios al inicio o final
- Reinicia el servidor después de actualizar

### Problema: Error de Supabase

**Causa**: Credenciales o schema incorrecto
**Solución**: Ver siguiente sección

## 🗄️ Verificar Configuración de Supabase

### Verificar que la tabla existe

Ejecuta este script:

```bash
node inspect-table.js
```

Si la tabla no existe, créala con:

```bash
# Opción 1: Usar el schema SQL
# Ve a Supabase Dashboard → SQL Editor
# Copia y ejecuta el contenido de SUPABASE_SCHEMA_V2.sql
```

### Verificar las Credenciales

Ejecuta:

```bash
node test-supabase.js
```

Deberías ver:

```
✅ Conexión exitosa a Supabase
✅ Tabla 'clients' existe
```

## 📞 Comandos Útiles

```bash
# Ver logs en tiempo real
npm run dev

# Verificar variables de entorno
cat .env.local

# Verificar tabla de Supabase
node inspect-table.js

# Probar conexión a Supabase
node test-supabase.js
```

## 🎯 Resumen de Checklist

- [ ] Webhook configurado en Clerk Dashboard
- [ ] URL del webhook correcta (con ngrok o deployment)
- [ ] Eventos `user.created` y `user.updated` seleccionados
- [ ] `CLERK_WEBHOOK_SECRET` copiado y agregado a `.env.local`
- [ ] Servidor reiniciado después de agregar variables
- [ ] Tabla `clients` existe en Supabase
- [ ] Credenciales de Supabase correctas
- [ ] Ngrok corriendo (si es desarrollo local)

## 📝 Notas Importantes

- **Los webhooks NO funcionan en localhost directamente** - Necesitas ngrok o un deployment
- **Cada vez que reinicias ngrok, la URL cambia** - Actualiza el webhook en Clerk
- **Los eventos solo se disparan para NUEVOS usuarios o actualizaciones** - Si te registraste antes de configurar el webhook, no se guardó
- **Los logs aparecen en la terminal donde corre `npm run dev`**, NO en el navegador
