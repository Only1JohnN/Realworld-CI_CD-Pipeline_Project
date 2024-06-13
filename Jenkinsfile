pipeline {
    agent any
    
    environment {
        PATH = "/usr/local/opt/node@20/bin:/usr/local/bin:/usr/bin:/bin"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }
        
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Checked out source code from SCM'
            }
        }

        stage('Static Code Analysis') {
            steps {
                dir('simple-web-app') {
                    nodejs('Node-20.14.0') {
                        // Install ESLint and necessary plugins explicitly
                        sh '/usr/local/opt/node@20/bin/npm install eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y @babel/eslint-parser --save-dev'
                        // Run ESLint with full path to npm
                        sh '/usr/local/opt/node@20/bin/npx eslint .'
                    }
                }
            }
        }

        stage('Security Scan') {
            steps {
                withCredentials([string(credentialsId: 'snyk-api-token', variable: 'SNYK_TOKEN')]) {
                    script {
                        dir('simple-web-app') {
                            // Authenticate with Snyk using token
                            sh 'snyk auth $SNYK_TOKEN'
                            // Run Snyk security tests
                            sh 'snyk test --all-projects'
                        }
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    // Wait for the quality gate to pass
                    def qualityGate = waitForQualityGate()
                    if (qualityGate.status != 'OK') {
                        error "Failed quality gate: ${qualityGate.status}"
                    }
                }
            }
        }

        stage('Manual Approval') {
            steps {
                // Manual approval step
                input "Please approve the deployment to QA environment"
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('simple-web-app') {
                    nodejs('Node-20.14.0') {
                        // Install backend dependencies
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('simple-web-app/client') {
                    nodejs('Node-20.14.0') {
                        // Install frontend dependencies
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('simple-web-app/client') {
                    nodejs('Node-20.14.0') {
                        // Build frontend
                        sh 'npm run build'
                    }
                }
            }
        }
    }

    post {
        always {
            // Archive frontend build artifacts
            archiveArtifacts artifacts: 'simple-web-app/client/build/**/*', allowEmptyArchive: true
        }
        success {
            echo 'Build was successful!'
        }
        failure {
            echo 'Build failed. Please check the logs for details.'
        }
    }
}
