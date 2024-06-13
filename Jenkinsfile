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
                        sh '/usr/local/opt/node@20/bin/npm install eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y @babel/eslint-parser @eslint/js @eslint/eslintrc --save-dev'
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
                            sh 'snyk auth $SNYK_TOKEN'
                            sh 'snyk test --all-projects'
                        }
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    def qualityGate = waitForQualityGate()
                    if (qualityGate.status != 'OK') {
                        error "Failed quality gate: ${qualityGate.status}"
                    }
                }
            }
        }

        stage('Manual Approval') {
            steps {
                input "Please approve the deployment to QA environment"
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('simple-web-app') {
                    nodejs('Node-20.14.0') {
                        sh '/usr/local/opt/node@20/bin/npm install'
                    }
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('simple-web-app/client') {
                    nodejs('Node-20.14.0') {
                        sh '/usr/local/opt/node@20/bin/npm install'
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('simple-web-app/client') {
                    nodejs('Node-20.14.0') {
                        sh '/usr/local/opt/node@20/bin/npm run build'
                    }
                }
            }
        }
    }

    post {
        always {
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
