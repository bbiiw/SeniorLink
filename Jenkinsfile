pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    // Checkout
                    git url: 'https://github.com/bbiiw/SeniorLink.git', branch: 'dev'
                }
            }
        }

        stage('Build and Start Docker Compose') {
            steps {
                script {
                    // ใช้คำสั่ง docker-compose เพื่อ build และ run ทั้ง frontend และ backend
                    sh 'docker-compose -f docker-compose.yml up --build -d'
                }
            }
        }

        stage('Test Frontend and Backend') {
            steps {
                script {
                    // ทดสอบ backend
                    sh 'curl http://34.87.118.33:8000/'
                    // ทดสอบ frontend
                    sh 'curl http://34.87.118.33:5173/'
                }
            }
        }
    }

    // post {
    //     always {
    //         script {
    //             // หยุดและลบ container ทั้งหมด
    //             sh 'docker-compose -f docker-compose.yml down'
    //         }
    //     }
    // }
}
