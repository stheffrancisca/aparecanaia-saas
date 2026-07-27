# Deploy script para Apareça na IA
# Este script faz push de todos os arquivos para o GitHub

$ErrorActionPreference = "Stop"

# Variáveis
$repoPath = Get-Location
$gitUser = "stheffrancisca"
$gitRepo = "aparecanaia-saas"

Write-Host "🚀 Iniciando deploy..." -ForegroundColor Green

# 1. Verificar se Git está instalado
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git não está instalado!" -ForegroundColor Red
    exit 1
}

# 2. Configurar Git
Write-Host "⚙️ Configurando Git..." -ForegroundColor Yellow
git config --global user.email "francientistadedados@gmail.com"
git config --global user.name "Sthefani"

# 3. Adicionar todos os arquivos
Write-Host "📦 Adicionando arquivos..." -ForegroundColor Yellow
git add -A

# 4. Commit
Write-Host "💾 Fazendo commit..." -ForegroundColor Yellow
git commit -m "Deploy: Apareça na IA SaaS platform com backend e frontend"

# 5. Push
Write-Host "🌐 Enviando para GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host "✅ Deploy concluído com sucesso!" -ForegroundColor Green
Write-Host "Repositório: https://github.com/$gitUser/$gitRepo" -ForegroundColor Cyan
