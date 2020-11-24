
![스크린샷 2020-11-20 오전 5 12 22](https://user-images.githubusercontent.com/43382559/99718919-fb33ef80-2aee-11eb-9917-22630ed5256a.png)
![image](https://user-images.githubusercontent.com/43382559/99718653-8bbe0000-2aee-11eb-9560-5528b9b4bea9.png)

# Spectrum

### 프로젝트의 계기 
저희 프로젝트는 경험의 기록/관리를 어려워하는 사람들을 위해서 시작하게 된 웹 서비스입니다.

평소 이력서나 자기소개서를 쓸 때 지난 경험들을 되짚어 보는 경우가 많은데. 이 때 기록물이

없으면 기억이 잘 나지 않아 힘들어 집니다. 이런 상황을 방지하기 위해서 기록물을 만든다고 해도 상당히 번거롭고,

또 나중에 쉽게 볼 수 있도록 효과적으로 만들고 정리하는 일 또한 쉽지 않은 일입니다. 

### 프로젝트의 목표
저희 서비스는 사용자가 자신의 경험을 **편리하게 정리**할 수 있도록 하고, 사용자가 자신의 **지난 경험을 쉽게 파악**할 수 있도록 하여주는 것입니다. 

### 시스템 구성도

![image](https://user-images.githubusercontent.com/43382559/99718803-ccb61480-2aee-11eb-8fc4-108bd9b43561.png)


# 실행 방법(Docker-compose)
`cp .env.test ./backend`
`docker-compose -f docker-compose.dev.yaml up -d --build`

# 실행 방법(개별 실행)

## FRONTEND

### Project Setup 

`cd frontend`
`npm install`

### Compiles and hot-reloads for development

`yarn serve`

## BACKEND

### Project Setup

`cd backend`
`npm install`

### Compiles and hot-reloads for development

`yarn serve`

## ML

`cd ml`
`flask run`




