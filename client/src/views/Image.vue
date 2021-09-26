<template>
  <div>
    <v-container fluid>
      <v-img class="mt-10" :src="imgSrc" max-height="70vh" contain> </v-img>
      <div class="explaination">
        <h2>Explaination:</h2>
        <h3>{{ imgExplaination }}</h3>
      </div>
    </v-container>
  </div>
</template>

<script>
const host = "http://localhost:5001/";
import axios from "axios";
export default {
  name: "ImageViewer",
  data() {
    return {
      imgSrc: "",
      imgExplaination: "N/A",
      canRequestExplaination: false,
      requestExplainationText: "",
    };
  },
  methods: {
    getNewImage() {
      axios.get(host + "image").then((response) => {
        const id = response.data.id;
        this.imgSrc = host + "image/content/" + id;
        this.imgExplaination =
          response.data.explaination == "" ? "N/A" : response.data.explaination;
        this.canRequestExplaination =
          !response.data.request_explaination &&
          response.data.explaination == "";
        if (response.data.explication != "") {
          this.requestExplainationText = " ALREADY EXPLAINED ";
        } else if (response.data.request_explaination) {
          this.requestExplainationText = "REQUEST ACKNOWLEDGED";
        }
      });
    },
  },
  mounted() {
    this.getNewImage();
  },
};
</script>

<style scoped>
.explaination {
  margin-left: 30%;
  margin-right: 30%;
  margin-top: 2vh;
  padding-left: 20px;
  padding-right: 20px;
  text-align: left;
  height: 5vh;
  border: 3px solid #cccccc;
  overflow-y: scroll;
  font-family: Tahoma, sans-serif;
}
</style>
