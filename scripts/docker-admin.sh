#!/bin/bash

# 🎛️ Docker Admin Dashboard Management - Grupo Naser CMS
# Gestión específica del contenedor admin

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to display usage
show_usage() {
    echo -e "${BLUE}🎛️ Docker Admin Dashboard Management${NC}"
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  start       Start admin dashboard container"
    echo "  stop        Stop admin dashboard container"
    echo "  restart     Restart admin dashboard container"
    echo "  build       Build admin dashboard image"
    echo "  rebuild     Rebuild admin dashboard from scratch"
    echo "  logs        Show admin dashboard logs"
    echo "  shell       Access admin dashboard container shell"
    echo "  test        Run admin dashboard tests"
    echo "  install     Install/update admin dependencies"
    echo "  status      Show admin dashboard status"
    echo "  clean       Clean admin dashboard containers and images"
    echo ""
    echo "Examples:"
    echo "  $0 start"
    echo "  $0 logs -f"
    echo "  $0 test --coverage"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo -e "${RED}❌ Docker is not running${NC}"
        exit 1
    fi
}

# Function to start admin dashboard
start_admin() {
    echo -e "${BLUE}🚀 Starting admin dashboard...${NC}"
    docker-compose up -d admin
    echo -e "${GREEN}✅ Admin dashboard started${NC}"
    echo -e "${YELLOW}📱 Access at: http://localhost:3001${NC}"
}

# Function to stop admin dashboard
stop_admin() {
    echo -e "${BLUE}🛑 Stopping admin dashboard...${NC}"
    docker-compose stop admin
    echo -e "${GREEN}✅ Admin dashboard stopped${NC}"
}

# Function to restart admin dashboard
restart_admin() {
    echo -e "${BLUE}🔄 Restarting admin dashboard...${NC}"
    docker-compose restart admin
    echo -e "${GREEN}✅ Admin dashboard restarted${NC}"
}

# Function to build admin dashboard
build_admin() {
    echo -e "${BLUE}🔨 Building admin dashboard...${NC}"
    docker-compose build admin
    echo -e "${GREEN}✅ Admin dashboard built${NC}"
}

# Function to rebuild admin dashboard from scratch
rebuild_admin() {
    echo -e "${BLUE}🔨 Rebuilding admin dashboard from scratch...${NC}"
    docker-compose build --no-cache admin
    echo -e "${GREEN}✅ Admin dashboard rebuilt${NC}"
}

# Function to show admin dashboard logs
show_logs() {
    echo -e "${BLUE}📋 Admin dashboard logs:${NC}"
    docker-compose logs admin "$@"
}

# Function to access admin dashboard shell
admin_shell() {
    echo -e "${BLUE}🐚 Accessing admin dashboard shell...${NC}"
    docker-compose exec admin sh
}

# Function to run admin dashboard tests
run_tests() {
    echo -e "${BLUE}🧪 Running admin dashboard tests...${NC}"
    docker-compose exec admin npm test "$@"
}

# Function to install/update dependencies
install_deps() {
    echo -e "${BLUE}📦 Installing/updating admin dependencies...${NC}"
    docker-compose exec admin npm install
    echo -e "${GREEN}✅ Dependencies updated${NC}"
}

# Function to show admin dashboard status
show_status() {
    echo -e "${BLUE}📊 Admin dashboard status:${NC}"
    
    # Check if container is running
    if docker-compose ps admin | grep -q "Up"; then
        echo -e "${GREEN}✅ Container: Running${NC}"
        
        # Check if service is responding
        if curl -s http://localhost:3001 > /dev/null; then
            echo -e "${GREEN}✅ Service: Responding${NC}"
        else
            echo -e "${YELLOW}⚠️  Service: Not responding${NC}"
        fi
        
        # Show container stats
        echo -e "${BLUE}📈 Container stats:${NC}"
        docker stats naser_admin --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"
        
    else
        echo -e "${RED}❌ Container: Not running${NC}"
    fi
}

# Function to clean admin dashboard containers and images
clean_admin() {
    echo -e "${BLUE}🧹 Cleaning admin dashboard...${NC}"
    
    # Stop container
    docker-compose stop admin 2>/dev/null || true
    
    # Remove container
    docker-compose rm -f admin 2>/dev/null || true
    
    # Remove image
    docker rmi $(docker images -q "*naser*admin*") 2>/dev/null || true
    
    echo -e "${GREEN}✅ Admin dashboard cleaned${NC}"
}

# Main script logic
check_docker

case "${1:-}" in
    start)
        start_admin
        ;;
    stop)
        stop_admin
        ;;
    restart)
        restart_admin
        ;;
    build)
        build_admin
        ;;
    rebuild)
        rebuild_admin
        ;;
    logs)
        shift
        show_logs "$@"
        ;;
    shell)
        admin_shell
        ;;
    test)
        shift
        run_tests "$@"
        ;;
    install)
        install_deps
        ;;
    status)
        show_status
        ;;
    clean)
        clean_admin
        ;;
    ""|help|--help|-h)
        show_usage
        ;;
    *)
        echo -e "${RED}❌ Unknown command: $1${NC}"
        show_usage
        exit 1
        ;;
esac