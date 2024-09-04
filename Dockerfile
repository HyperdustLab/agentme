FROM node:20.14.0

# 创建并设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 或 yarn.lock 文件
COPY package*.json ./

# 或者，如果你使用 yarn:
# COPY package.json yarn.lock ./

# 安装项目依赖
RUN npm install
# 如果你使用 yarn:
# RUN yarn install

# 复制项目的源代码到工作目录
COPY . .

# 暴露应用运行的端口
EXPOSE 3000

# 定义启动容器时执行的命令
CMD ["node", "index.js"]




