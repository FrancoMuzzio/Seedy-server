const express = require("express");
const { Message } = require("./models");
const authRoutes = require("./routes/authRoutes");
const communitiesRoutes = require("./routes/communitiesRoutes");
const userRoutes = require("./routes/userRoutes");
const imageRoutes = require("./routes/imageRoutes");
const plantRoutes = require("./routes/plantRoutes");
const chatRoutes = require("./routes/chatRoutes");
const sequelize = require("./config/database");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerConfig");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", communitiesRoutes);
app.use("/", imageRoutes);
app.use("/", plantRoutes);
app.use("/", chatRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Sincronización con la base de datos
sequelize.sync();

io.on("connection", (socket) => {
  socket.on("disconnect", () => {});

  socket.on("send_message", async (messageData) => {
    try {
      console.log("ACA");
      console.log(messageData);
      const createdMessage = await Message.create({
        text: messageData.text,
        community_id: messageData.community_id,
        user_id: messageData.user.id,
      });
      const messageToEmit = {
        ...messageData,
        id: createdMessage.id, 
        createdAt: createdMessage.createdAt, 
      };

      io.emit("receive_message", messageToEmit);
    } catch (error) {
      console.error("Error al guardar el mensaje:", error);
    }
  });
});

server.listen(3000, () => {
  console.info("Servidor corriendo en el puerto 3000");
});
