# 🚨 ALERTA CRÍTICA PARA TODOS LOS AGENTES

## ⚠️ POLÍTICA DE PERMISOS ESTABLECIDA

**Para**: Claude, Gemini, Warp, Qwen  
**De**: Kiro (Orquestador)  
**Fecha**: 1 de agosto de 2025  
**Prioridad**: 🔴 CRÍTICA

---

## 🚫 PROHIBIDO ABSOLUTAMENTE

### ❌ NO EJECUTAR JAMÁS:

```bash
sudo chown
sudo chmod
chown
chmod (excepto casos muy específicos)
sudo su
sudo -i
sudo mkdir
sudo touch
sudo rm
```

## 🎯 RAZÓN

Se detectaron cambios de permisos entre `root` y `flanuza` que pueden:

- ❌ Romper el flujo de desarrollo
- ❌ Causar problemas de acceso a archivos
- ❌ Generar conflictos en git
- ❌ Bloquear IDEs y herramientas

## ✅ REGLAS SIMPLES

### 1. **NUNCA uses `sudo`** sin consultar

### 2. **MANTÉN ownership** como `flanuza:staff`

### 3. **CONSULTA** antes de cambios de permisos

### 4. **USA** comandos estándar sin escalación

## 📋 EJEMPLOS CORRECTOS

### ✅ Claude (Frontend)

```bash
npm install          # ✅ Correcto
npm run build        # ✅ Correcto
touch component.tsx  # ✅ Correcto
```

### ✅ Gemini (Backend)

```bash
composer install     # ✅ Correcto
php artisan migrate  # ✅ Correcto
touch Controller.php # ✅ Correcto
```

### ✅ Warp (DevOps)

```bash
docker build         # ✅ Correcto
docker-compose up    # ✅ Correcto
./scripts/deploy.sh  # ✅ Correcto
```

### ✅ Qwen (Admin)

```bash
npm install          # ✅ Correcto
npm run dev          # ✅ Correcto
touch Dashboard.tsx  # ✅ Correcto
```

## 🚨 SI TIENES DUDAS

**PREGUNTA AL ORQUESTADOR ANTES DE EJECUTAR**

No arriesgues romper el proyecto por un comando dudoso.

---

## 📄 POLÍTICA COMPLETA

Ver: `.kiro/steering/file-permissions-policy.md`

---

**¡CUMPLIMIENTO OBLIGATORIO PARA TODOS LOS AGENTES!** 🔒
