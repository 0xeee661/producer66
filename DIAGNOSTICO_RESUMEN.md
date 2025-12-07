# 🔎 DIAGNÓSTICO COMPLETO - Problema del Webhook de Clerk

## ✅ Estado Actual

He analizado tu aplicación y encontré lo siguiente:

### Variables de Entorno ✅
```
✅ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: Configurada
✅ CLERK_SECRET_KEY: Configurada  
✅ CLERK_WEBHOOK_SECRET: Configurada
✅ NEXT_PUBLIC_SUPABASE_URL: Configurada
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: Configurada
```

### Conexión a Supabase ✅
```
✅ Conexión exitosa a Supabase
✅ Tabla 'clients' existe y es accesible
✅ Schema correcto con columnas en snake_case
```

### Código del Webhook ✅
```
✅ Route handler existe: /src/app/api/webhooks/clerk/route.ts
✅ Logs de diagnóstico agregados
✅ Lógica de procesamiento correcta
✅ Manejo de errores implementado
```

## ❌ PROBLEMA PRINCIPAL IDENTIFICADO

### El webhook NO se está ejecutando

**Evidencia:**
- Los console.log NO aparecen en la consola
- Los usuarios NO se guardan en la base de datos
- No hay errores en el código (porque no se ejecuta)

**Causa raíz:**
🚨 **Clerk NO está enviando eventos a tu aplicación**

Esto sucede porque:
1. ❌ El webhook NO está configurado en Clerk Dashboard, o
2. ❌ La URL del webhook es incorrecta, o
3. ❌ Tu aplicación no es accesible públicamente

## 🔧 SOLUCIÓN PASO A PASO

### Para Desarrollo Local (Usando ngrok)

#### Paso 1: Instalar ngrok
```bash
brew install ngrok
```

#### Paso 2: Iniciar tu aplicación (Terminal 1)
```bash
npm run dev
```

Deberías ver:
```
✓ Starting...
✓ Ready on http://localhost:3000
```

#### Paso 3: Exponer con ngrok (Terminal 2 - NUEVA TERMINAL)
```bash
ngrok http 3000
```

Ngrok mostrará algo como:
```
Forwarding https://a1b2-c3-d4.ngrok-free.app -> http://localhost:3000
```

**🔴 IMPORTANTE:** Copia la URL de ngrok (la parte que dice `https://xxxx.ngrok-free.app`)

#### Paso 4: Configurar en Clerk Dashboard

1. Ve a: https://dashboard.clerk.com/
2. Selecciona tu aplicación
3. En el menú lateral, click en **"Webhooks"**
4. Click en **"+ Add Endpoint"** (o "Create" si no tienes ninguno)
5. En "Endpoint URL", pega:
   ```
   https://TU-URL-DE-NGROK.ngrok-free.app/api/webhooks/clerk
   ```
   Ejemplo: `https://a1b2-c3-d4.ngrok-free.app/api/webhooks/clerk`

6. En "Subscribe to events", selecciona:
   - ✅ user.created
   - ✅ user.updated
   - (Opcional) ✅ user.deleted

7. Click en **"Create"**

8. Clerk te mostrará un **"Signing Secret"** que empieza con `whsec_`
   - Cópialo

#### Paso 5: Actualizar el webhook secret (si es necesario)

Abre tu `.env.local` y verifica que tengas:
```env
CLERK_WEBHOOK_SECRET=whsec_el_nuevo_secret_que_copiaste
```

Si el secret cambió, actualízalo y **reinicia el servidor** (Ctrl+C y `npm run dev` de nuevo).

#### Paso 6: Probar el webhook

**Opción A: Enviar evento de prueba desde Clerk**
1. En Clerk Dashboard → Webhooks → Tu endpoint
2. Click en la pestaña "Testing"
3. Click en "Send example"
4. **Ve a tu terminal donde corre `npm run dev`**
5. Deberías ver logs como:
   ```
   🚀 ============================================
   🚀 WEBHOOK CLERK - INICIO DE EJECUCIÓN
   🚀 Timestamp: 2025-12-01T...
   🚀 ============================================
   📋 Headers recibidos:
     - svix-id: msg_xxxxx
     - svix-signature: ✅ presente
     - webhook-secret configurado: ✅
   ✅ Webhook verificado correctamente
   📨 Tipo de evento: user.created
   ...
   ```

**Opción B: Registrar un nuevo usuario**
1. **IMPORTANTE:** Cierra sesión si estás logueado
2. Ve a `http://localhost:3000/sign-up`
3. Regístrate con un **email completamente nuevo** (uno que NUNCA hayas usado)
4. **Ve a tu terminal donde corre `npm run dev`**
5. Deberías ver los mismos logs de arriba
6. Ve a Supabase Dashboard → Table Editor → clients
7. Deberías ver el nuevo usuario

### Para Producción (Vercel)

#### Paso 1: Desplegar en Vercel
```bash
# Asumiendo que ya tienes tu repo en GitHub
vercel --prod
```

#### Paso 2: Configurar webhook en Clerk

1. Ve a: https://dashboard.clerk.com/
2. Selecciona tu aplicación
3. En el menú lateral, click en **"Webhooks"**
4. Click en **"+ Add Endpoint"**
5. En "Endpoint URL", pega:
   ```
   https://tu-dominio.vercel.app/api/webhooks/clerk
   ```
6. Selecciona eventos: user.created, user.updated
7. Click en **"Create"**
8. Copia el "Signing Secret"

#### Paso 3: Agregar secret a Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega:
   - Name: `CLERK_WEBHOOK_SECRET`
   - Value: `whsec_el_secret_que_copiaste`
4. Click en "Save"
5. **Redeploy** tu aplicación

## 📊 Cómo Verificar que Funciona

### En la Terminal (Desarrollo Local)
Después de registrar un usuario, deberías ver:

```
🚀 WEBHOOK CLERK - INICIO DE EJECUCIÓN
📋 Headers recibidos:
  - svix-id: msg_2qxxxxxxxxxxxxxxx
  - svix-signature: ✅ presente
  - webhook-secret configurado: ✅
✅ Webhook verificado correctamente
📨 Tipo de evento: user.created
👤 Datos del usuario:
  - ID: user_2qxxxxxxxxxxxxxxx
  - Email: nuevo@ejemplo.com
  - Nombre: Juan
  - Apellido: Pérez
🔐 Tipo de registro detectado: email
💾 Datos a guardar en Supabase: {
  "clerk_id": "user_2qxxxxxxxxxxxxxxx",
  "email": "nuevo@ejemplo.com",
  "registration_type": "email",
  "first_name": "Juan",
  "second_name": "Pérez",
  ...
}
📊 Resultado de Supabase:
  - Data: { id: 1, email: 'nuevo@ejemplo.com', ... }
  - Error: null
✅ Cliente procesado via webhook: ID=1
```

### En Supabase Dashboard
1. Ve a: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Table Editor → tabla `clients`
4. Deberías ver el usuario con todos los datos

### En Clerk Dashboard
1. Ve a Webhooks → Tu endpoint
2. La pestaña "Logs" mostrará las peticiones enviadas
3. Deberías ver status 200 (success)

## 🚨 Solución de Problemas Comunes

### Problema: No veo ningún log en la consola

**Solución:**
- Verifica que ngrok esté corriendo (`ngrok http 3000`)
- Verifica que la URL del webhook en Clerk sea correcta
- Verifica que incluya `/api/webhooks/clerk` al final
- Prueba enviando un evento de prueba desde Clerk Dashboard

### Problema: Error "Error verifying webhook"

**Solución:**
- El `CLERK_WEBHOOK_SECRET` es incorrecto
- Cópialo nuevamente desde Clerk Dashboard
- Asegúrate de no tener espacios al inicio/final
- Reinicia el servidor después de actualizar

### Problema: Error de Supabase en los logs

**Solución:**
- Ejecuta: `node test-supabase.js`
- Verifica las credenciales de Supabase
- Verifica que la tabla `clients` exista

### Problema: Ngrok URL cambia cada vez

**Solución:**
- Esto es normal con ngrok gratuito
- Cada vez que reinicias ngrok, actualiza la URL en Clerk Dashboard
- O considera usar ngrok de pago para tener una URL fija
- O despliega en Vercel para producción

## 📚 Recursos Creados

He actualizado/creado estos archivos para ayudarte:

1. **`WEBHOOK_DEBUGGING.md`** - Guía completa de debugging
2. **`diagnose.sh`** - Script de diagnóstico automático
3. **`test-webhook-config.js`** - Test de configuración
4. **`README.md`** - Actualizado con instrucciones
5. **`src/app/api/webhooks/clerk/route.ts`** - Mejorado con logs detallados

## 🎯 Siguiente Paso INMEDIATO

Si estás en **desarrollo local**:

```bash
# Terminal 1
npm run dev

# Terminal 2 (nueva terminal)
ngrok http 3000

# Luego configura el webhook en Clerk Dashboard
# con la URL que ngrok te dio
```

Si estás en **producción**:

1. Despliega a Vercel
2. Configura el webhook en Clerk con tu URL de Vercel
3. Agrega el secret a las variables de entorno de Vercel

---

## ✅ Resumen

**Problema:** El webhook NO se ejecuta porque Clerk no sabe dónde enviar los eventos

**Solución:** Configurar el webhook endpoint en Clerk Dashboard con:
- URL pública (ngrok para local, Vercel para producción)
- Eventos seleccionados (user.created, user.updated)
- Webhook secret configurado

**Después de configurar:** Los usuarios se guardarán automáticamente en Supabase cuando se registren con Clerk.
