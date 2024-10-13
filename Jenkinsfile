pipeline {
    agent any

    environment {
        DOCKER_IMAGE       = 'earth123456798/seniorfrontend:latest'
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
                    sh 'docker pull $DOCKER_IMAGE'
                    sh 'docker run -d --name taf -p 8087:3000 $DOCKER_IMAGE'
                }
            }
        }
    }

    post {
        always {
            node {
                sh 'docker logout'
            }
        }
    }
}
