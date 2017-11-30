#!/usr/bin/env groovy

pipeline {
    agent any

    tools {nodejs 'node6.11.3'}

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                sh 'npm run sonar'
            }
        }
    }
}

