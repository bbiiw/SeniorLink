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
                    // ใช้คำสั่ง docker-compose ผ่าน sh
                    sh 'docker-compose -f docker-compose.yml up --build -d'
                }
            }
        }

        stage('Test Backend') {
            steps {
                script {
                    // ทดสอบ backend โดยการเรียก API ผ่าน IP จริง
                    sh 'curl http://35.240.166.181:8000/api/healthcheck'
                }
            }
        }
    }
}
