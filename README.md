# Spectrum

### 프로젝트의 계기 
저희 프로젝트는 경험의 기록/관리를 어려워하는 사람들을 위해서 시작하게 된 웹 서비스입니다.

평소 이력서나 자기소개서를 쓸 때 지난 경험들을 되짚어 보는 경우가 많은데. 이 때 기록물이

없으면 기억이 잘 나지 않아 힘들어 집니다. 이런 상황을 방지하기 위해서 기록물을 만든다고 해도 상당히 번거롭고,

또 나중에 쉽게 볼 수 있도록 효과적으로 만들고 정리하는 일 또한 쉽지 않은 일입니다. 

### 프로젝트의 목표
저희 서비스는 사용자가 자신의 경험을 **편리하게 정리**할 수 있도록 하고, 사용자가 자신의 **지난 경험을 쉽게 파악**할 수 있도록 하여주는 것입니다. 


# 설치 방법

## FRONTEND

### Project Setup 

`npm install`

### Compiles and hot-reloads for development

`yarn serve`

## BACKEND

### Project Setup

`npm install`

### Compiles and hot-reloads for development

`yarn serve`


## 현재까지 진행 상황
사용자가 쉽게 자신의 경험을 입력하고 관리하고 파악할 수 있는 방법으로 마인드맵 형태를 택하여서 개발을 진행하였고

사용자가 마인드맵을 통해서 자신의 경험에 대해 작성하고 볼 수 있도록 **Cytoscape.js** 라이브러리를 통해서 마인드맵 조작부까지

사용가능하도록 개발을 진행한 상태 입니다. 


## 사용방법
![image](/uploads/ef186454c515a741c20320201fa0db29/image.png)

>  사용자가 마인드맵을 사용했을 때 데이터를 등록한 예시 사진입니다.팀원 중 한명의 실제 경험들을 작성해본 것입니다. 

### Cytoscape-Cxtmenu를 통한 마인드맵 조작
![image](/uploads/d165436dd0c80526730af7e1fbe27aea/image.png)

Cytoscape의 익스텐션 중 하나인 cxtmenu를 통해서 사용자가 쉽게 마인드맵을 조작할 수 있도록 기능을 개발하였습니다.

노드, 엣지, 블랭크(여백공간)에 따라 작동하는 cxtmenu가 각각 적용되어져 있습니다.
#### Node
1.  Add : 노드에서 새로운 노드를 추가할 떄
![image](/uploads/cebfaff5dcf52e653411d62bbde1ae99/image.png)
![image](/uploads/77cacc06849c39b44dfa93083ea65f70/image.png)
2.  Delete : 노드를 삭제하고자 할 때
![image](/uploads/e31f6c170b3734ebc4b01997b1d59308/image.png)
![image](/uploads/da5105b1d8b607faf95f17cb0905f20f/image.png)
3.  Start : 노드에서 새로운 노드로 엣지를 연겷하려고 할 때
![image](/uploads/d6ef11064563b23eac2599bebefd29c7/image.png)
![image](/uploads/8e3ab9d74b6af4cf110d6865908789e9/image.png)
![image](/uploads/02cec78410b00404f4ebe94f16a790a6/image.png)

#### Edge
1.  Delete : 엣지를 삭제하고자 할 때
![image](/uploads/e8b9d9ede2e2e6fa46d9956a805fe7b6/image.png)
![image](/uploads/b82b34c85905c12a5563bf8f5b291bfe/image.png)
#### Blank
1. ADD : 새로운 노드를 추가하고자 할 때(기종의 노드와 연결 되어 있지 않은)
![image](/uploads/45e612e9d54da27155b366396322e24e/image.png)
![image](/uploads/c98c1940217756c4de26eca83d6e933f/image.png)
2. 기타(개발진행 중) : 마인드맵 관련 설정 사항







