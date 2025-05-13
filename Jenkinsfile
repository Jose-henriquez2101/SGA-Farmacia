pipeline {
  agent any

  environment {
    DATABASE_URL = 'mysql://root:root@db:3306/crud_db'
  }

    stage('Construir imágenes Docker') {
      steps {
        script {
          sh 'docker-compose build --no-cache'
        }
      }
    }

    stage('Levantar contenedores') {
      steps {
        script {
          sh 'docker-compose up -d'
        }
      }
    }

    stage('Esperar MySQL') {
      steps {
        script {
          // Esperar a que el puerto 3306 esté activo
          sh '''
          for i in {1..10}; do
            docker exec mysql_container mysqladmin --user=root --password=root --host=db --port=3306 ping --silent && echo "MySQL está listo" && exit 0
            echo "Esperando MySQL..."
            sleep 5
          done
          echo "MySQL no respondió a tiempo"
          exit 1
          '''
        }
      }
    }

    stage('Prisma Generate y DB Push') {
      steps {
        script {
          sh 'docker exec nest_app npx prisma generate'
          sh 'docker exec nest_app npx prisma db push'
        }
      }
    }

    stage('Verificar servicio NestJS') {
      steps {
        script {
          sh '''
          for i in {1..5}; do
            curl -f http://localhost:3000/clientes && echo "✅ NestJS responde" && exit 0
            echo "Esperando servicio NestJS..."
            sleep 3
          done
          echo "❌ NestJS no respondió"
          exit 1
          '''
        }
      }
    }
  }

  post {
    success {
      echo '✅ Aplicación levantada exitosamente con Docker.'
    }
    failure {
      echo '❌ Hubo un error en el pipeline.'
    }
    always {
      script {
        // Mostrar logs si algo sale mal, útil para debugging
        sh 'docker-compose logs --tail=50'
      }
    }
  }
}
