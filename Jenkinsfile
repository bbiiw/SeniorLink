pipeline {
    agent any

    environment {
        DOCKER_IMAGE       = 'earth123456789/seniorfrontend:latest'
        DOCKER_CREDENTIALS = credentials('docker')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/bbiiw/SeniorLink.git', branch: 'frontend'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh 'echo $DOCKER_CREDENTIALS_PSW | docker login --username $DOCKER_CREDENTIALS_USR --password-stdin'
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
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
            // ใช้ node พร้อม label เพื่อให้มี workspace ที่ถูกต้องสำหรับรันคำสั่ง shell
            node('any') {
                sh 'docker logout || true'
            }
        }
    }
}
