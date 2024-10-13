pipeline {
    agent any

    environment {
        // Define variables
        DOCKER_IMAGE       = 'earth123456798/seniorfrontend:latest'
        DOCKER_CREDENTIALS = credentials('docker')
    }

    stages {
        stage('Start Jenkins') {
            steps {
                // Checkout your source code from version control
             
                    sh 'echo Start Jenkins............'
                    sh 'echo docker : user = $DOCKER_CREDENTIALS_USR : password = $DOCKER_CREDENTIALS_PSW'
            }
        }

        stage('Build Docker Image') {
            steps {
                    // Build the Docker image
                    
                    dir('./') {
                       sh 'echo "Running in $(pwd)"'
                       sh 'echo start build the Docker image = $DOCKER_IMAGE'
                       sh 'docker build -t $DOCKER_IMAGE .'
                    }   
                  
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    
                    // Login to Docker Hub
                    sh 'echo $DOCKER_CREDENTIALS_PSW | docker login --username $DOCKER_CREDENTIALS_USR --password-stdin'
                    // Push the image
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Pull the Docker image from Docker Hub
                    sh 'docker pull $DOCKER_IMAGE'
                    // Run the Docker container
                    sh 'docker run -d --name taf -p 8087:3000 $DOCKER_IMAGE'
                }
            }
        }
    }

    post {
        always {
            // Logout from Docker Hub
            sh 'docker logout'
        }
    }
}