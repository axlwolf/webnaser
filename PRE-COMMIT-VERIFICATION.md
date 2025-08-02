# 🔍 VERIFICACIÓN PRE-COMMIT - GRUPO NASER CMS

## 🎯 OBJETIVO

Ejecutar test suite completa, builds de todas las apps y verificar funcionamiento antes del commit final.

## 📋 CHECKLIST DE VERIFICACIÓN

### ✅ FASE 1: TESTING COMPLETO

- [ ] Tests backend (PHP/API)
- [ ] Tests frontend (React)
- [ ] Tests admin dashboard
- [ ] Linting y code quality

### ✅ FASE 2: BUILDS

- [ ] Build frontend
- [ ] Build admin dashboard
- [ ] Build backend (composer)

### ✅ FASE 3: VERIFICACIÓN FUNCIONAL

- [ ] API endpoints funcionando
- [ ] Frontend cargando correctamente
- [ ] Admin dashboard operativo
- [ ] Docker containers healthy

### ✅ FASE 4: COMMIT FINAL

- [ ] Git status clean
- [ ] Commit message descriptivo
- [ ] Push a repositorio

---

## 🚀 COMANDOS DE EJECUCIÓN

### 1. TESTING BACKEND

```bash
cd api && composer test
```

### 2. TESTING FRONTEND

```bash
cd src/frontend && npm test
```

### 3. TESTING ADMIN

```bash
cd src/admin && npm test
```

### 4. LINTING

```bash
npm run lint:all
```

### 5. BUILDS

```bash
npm run build:frontend
npm run build:admin
```

### 6. VERIFICACIÓN DOCKER

```bash
docker-compose up -d
docker-compose ps
```

---

## 📊 RESULTADOS ESPERADOS

- ✅ Todos los tests pasando
- ✅ Builds exitosos sin errores
- ✅ Aplicaciones funcionando
- ✅ Linting sin warnings críticos
- ✅ Docker containers healthy
