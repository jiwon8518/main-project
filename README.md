# yanolja

## 프로젝트 설명

> 야놀자 사이트를 벤치마킹 하였습니다.
>
> `소셜로그인`과 `결제` 등을 비롯하여 `다양한 CRUD` 기능 구현

<br/>

## 배포주소

> **_[https://holymoly90.shop](https://holymoly90.shop)_**

<br/>

## 기술스택

`JavaScript`, `TypeScript`, `NodeJS`, `NestJS`, `TypeORM`, `Express`, `JWT`, `GraphQL`, `MySQL`, `Axios`, `ElasticSearch`, `Logstash`, `Redis`, `Docker`, `Git`, `GitHub`, `GCP`

<br/>

## ERD

![Copy of yanolja](https://user-images.githubusercontent.com/91056667/164258645-d8abb251-fc35-4eb2-aeae-467e0c91f0e5.png)

<br/>

## API

<!--table-->

| api 기능     | request                                  | respose                 |
| ------------ | ---------------------------------------- | ----------------------- |
| Create       | Mutation{API name:contents}{request col} | 등록 성공 or 실패메시지 |
| Update       | Mutation{API name:contents}{request col} | 수정 성공 or 실패메시지 |
| Delete       | Mutation{API name:contents}{request col} | 삭제 성공 or 실패메시지 |
| Fetch        | Query{API name}{request col}             | 조회 성공 or 실패메시지 |
| login/logout | Query{API name}{request col}             | 성공 or 실패메시지      |

<br/>

## 프로젝트 설치 방법 & 실행 방법

```bash
git clone https://github.com/jiwon8518/main-project.git

yarn install
```

<br/>

## 폴더 구조

```
main-project
├─ .vscode
│  └─ settings.json
├─ backend
│  ├─ .dockerignore
│  ├─ .env
│  ├─ .eslintrc.js
│  ├─ .prettierrc
│  ├─ docker-compose.yaml
│  ├─ Dockerfile
│  ├─ elk
│  │  ├─ elasticsearch
│  │  ├─ kibana
│  │  └─ logstash
│  │     ├─ logstash.conf
│  │     └─ mysql-connector-java-8.0.28.jar
│  ├─ functions
│  │  ├─ 01.generateThumbnail.js
│  │  ├─ 02.generateThumbnail-includes.js
│  │  ├─ 03.generateThumbnail-multi.js
│  │  ├─ 04.generateThumbnail-multi-promise-all-1.js
│  │  ├─ 05.generateThumbnail-multi-promise-all-2.js
│  │  ├─ generateThumbnail.js
│  │  └─ imageGCS.js
│  ├─ nest-cli.json
│  ├─ package.json
│  ├─ README.md
│  ├─ src
│  │  ├─ apis
│  │  │  ├─ auth
│  │  │  │  ├─ auth.controller.ts
│  │  │  │  ├─ auth.module.ts
│  │  │  │  ├─ auth.resolver.ts
│  │  │  │  └─ auth.service.ts
│  │  │  ├─ coupon
│  │  │  │  └─ entities
│  │  │  │     └─ coupon.entity.ts
│  │  │  ├─ file
│  │  │  │  ├─ file.module.ts
│  │  │  │  ├─ file.resolver.ts
│  │  │  │  └─ file.service.ts
│  │  │  ├─ iamport
│  │  │  │  └─ iamport.service.ts
│  │  │  ├─ image
│  │  │  │  ├─ entities
│  │  │  │  │  └─ image.entity.ts
│  │  │  │  ├─ image.module.ts
│  │  │  │  ├─ image.resolver.ts
│  │  │  │  ├─ image.service.ts
│  │  │  │  └─ image.service_backup.ts
│  │  │  ├─ like
│  │  │  │  └─ entities
│  │  │  │     └─ like.entity.ts
│  │  │  ├─ mainCategory
│  │  │  │  ├─ entities
│  │  │  │  │  └─ mainCategory.entity.ts
│  │  │  │  ├─ mainCategory.module.ts
│  │  │  │  ├─ mainCategory.resolver.ts
│  │  │  │  └─ mainCategory.service.ts
│  │  │  ├─ payment
│  │  │  │  ├─ entities
│  │  │  │  │  └─ payment.entity.ts
│  │  │  │  ├─ payment.module.ts
│  │  │  │  ├─ payment.resolver.ts
│  │  │  │  └─ payment.service.ts
│  │  │  ├─ place
│  │  │  │  └─ entities
│  │  │  │     └─ place.entity.ts
│  │  │  ├─ reservation
│  │  │  │  └─ entities
│  │  │  │     └─ reservation.entity.ts
│  │  │  ├─ review
│  │  │  │  └─ entities
│  │  │  │     └─ review.entity.ts
│  │  │  ├─ room
│  │  │  │  ├─ dto
│  │  │  │  │  ├─ createRoom.input.ts
│  │  │  │  │  └─ updateRoom.input.ts
│  │  │  │  ├─ entities
│  │  │  │  │  └─ room.entity.ts
│  │  │  │  ├─ room.module.ts
│  │  │  │  ├─ room.resolver.ts
│  │  │  │  └─ room.service.ts
│  │  │  ├─ roomtTag
│  │  │  │  └─ entities
│  │  │  │     └─ roomTag.entity.ts
│  │  │  ├─ shoppingBasket
│  │  │  │  └─ entities
│  │  │  │     └─ shoppingBasket.entity.ts
│  │  │  ├─ subCategory
│  │  │  │  ├─ dto
│  │  │  │  ├─ entities
│  │  │  │  │  └─ subCategory.entity.ts
│  │  │  │  ├─ subCategory.module.ts
│  │  │  │  ├─ subCategory.resolver.ts
│  │  │  │  └─ subCategory.service.ts
│  │  │  └─ user
│  │  │     ├─ dto
│  │  │     │  ├─ createUser.input.ts
│  │  │     │  └─ updateUser.input.ts
│  │  │     ├─ entities
│  │  │     │  └─ user.entity.ts
│  │  │     ├─ user.module.ts
│  │  │     ├─ user.resolver.ts
│  │  │     └─ user.service.ts
│  │  ├─ app.module.ts
│  │  ├─ common
│  │  │  ├─ auth
│  │  │  │  ├─ gql-auth-guard.ts
│  │  │  │  ├─ gql-user.param.ts
│  │  │  │  ├─ jwt-access.stategy.ts
│  │  │  │  ├─ jwt-refresh.stategy.ts
│  │  │  │  ├─ jwt-social-google.stategy.ts
│  │  │  │  ├─ jwt-social-kakako.stategy.ts
│  │  │  │  └─ jwt-social-naver.stategy.ts
│  │  │  ├─ filter
│  │  │  │  └─ http-exception.filter.ts
│  │  │  └─ graphql
│  │  │     └─ schema.gql
│  │  └─ main.ts
│  ├─ test
│  │  ├─ app.e2e-spec.ts
│  │  └─ jest-e2e.json
│  ├─ tsconfig.build.json
│  ├─ tsconfig.json
│  ├─ yanolja-eef983610cc2.json
│  ├─ yarn-error.log
│  └─ yarn.lock
└─ frontend
   ├─ img
   │  ├─ back-ground.jpg
   │  ├─ facebook.png
   │  ├─ google.png
   │  ├─ kakao.png
   │  ├─ menu-back-ground.jpg
   │  ├─ naver.png
   │  ├─ starbucks.png
   │  └─ user-back-ground.jpg
   ├─ login
   │  ├─ index.css
   │  └─ index.html
   └─ payment.html

```

<br/>

## .env 설정

```
GOOGLE_CLIENTID
GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL

NAVER_CLIENTID
NAVER_CLIENT_SECRET
NAVER_CALLBACK_URL

KAKAO_CLIENTID
KAKAO_CLIENT_SECRET
KAKAO_CALLBACK_URL

IAMPORT_API_KEY
IAMPORT_SECRET

STORAGE_KEY_FILENAME
STORAGE_PROJECT_ID
STORAGE_BUCKET
```

<br/>

---

# Contact

## 안지원

:email: jiwon8518@naver.com
