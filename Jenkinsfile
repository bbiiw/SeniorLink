pipeline {
    agent any

    environment {
        DOCKER_IMAGE       = 'earth123456789/seniorfrontend:latest'
        DOCKER_CREDENTIALS = credentials('docker')
    }

    stages {
        stage('Checkout Code') {
            steps {
                // ดึงโค้ดจาก GitHub
                git url: 'https://github.com/bbiiw/SeniorLink.git', branch: 'frontend'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // สร้าง Docker Image โดยใช้ Dockerfile
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Login เข้า Docker Hub และ push image
                    sh 'echo $DOCKER_CREDENTIALS_PSW | docker login --username $DOCKER_CREDENTIALS_USR --password-stdin'
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // หยุดและลบ container ที่มีอยู่ก่อนที่จะรัน container ใหม่
                    sh '''
                    if [ $(docker ps -q -f name=taf) ]; then
                        docker stop taf
                        docker rm taf
                    fi
                    docker pull $DOCKER_IMAGE
                    docker run -d --name taf -p 5173:5173 $DOCKER_IMAGE
                    '''
                }
            }
        }
    }

    post {
        always {
            // logout ออกจาก Docker
            script {
                sh 'docker logout || true'
            }
        }
    }
}
