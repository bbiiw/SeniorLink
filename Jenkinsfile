pipeline {
    agent any

    environment {
        DOCKER_IMAGE       = 'earth123456789/seniorbackend:latest'
        DOCKER_CREDENTIALS = credentials('dockerhub')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/bbiiw/SeniorLink.git', branch: 'backend'
            }
        }

        stage('Build and Start with Docker Compose') {
            steps {
                script {
                    // ใช้ Docker Compose Plugin แทนคำสั่ง sh docker-compose
                    dockerCompose up: '--build -d'
                }
            }
        }

        stage('Test Backend') {
            steps {
                script {
                    // ทดสอบ backend เช่นเช็คสุขภาพระบบ
                    sh 'curl http://localhost:8080/api/healthcheck'
                }
            }
        }
    }

    post {
        always {
            script {
                // ใช้ Docker Compose Plugin เพื่อหยุด services
                dockerCompose down: '--volumes'
            }
        }
    }
}
