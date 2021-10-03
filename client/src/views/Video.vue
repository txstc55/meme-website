<template>
  <div>
    <v-container fluid>
      <video id="videoPlayer" controls>
        <source :src="videoSrc" type="video/mp4" />
      </video>
      <div class="utils">
        <v-row>
          <v-col cols="1" xl="2" lg="2" md="2" sm="1" xs="1"></v-col>
          <v-col cols="10" xl="8" lg="8" md="8" sm="10" xs="10">
            <h5 class="explaination">Explaination: {{ explaination }}</h5>
          </v-col>
          <v-col cols="1" xl="2" lg="2" md="2" sm="1" xs="1"></v-col>
        </v-row>
        <v-row>
          <v-col cols="1" xl="3" lg="3" md="2" sm="1" xs="1"></v-col>
          <v-col cols="10" xl="6" lg="6" md="8" sm="10" xs="10">
            <v-btn
              block
              class="output-button"
              color="rgb(10, 192, 144)"
              @click="getAnotherOne"
              >ANOTHER ONE</v-btn
            >
            <v-btn
              block
              class="output-button mt-1"
              color="rgb(10, 192, 144)"
              @click="requestExplaination"
              :disabled="!canRequestExplaination"
              >{{ requestExplainationText }}</v-btn
            >
            <v-btn
              block
              class="output-button mt-1"
              color="rgb(10, 192, 144)"
              @click="download"
              >SAVE IT</v-btn
            >
          </v-col>
          <v-col cols="1" xl="3" lg="3" md="2" sm="1" xs="1"></v-col
        ></v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
const host = "http://134.209.65.198:5001/";
import axios from "axios";
export default {
  name: "VideoViewer",
  data() {
    return {
      videoSrc: "",
      explaination: "No Explaination Yet",
      canRequestExplaination: false,
      requestExplainationText: "REQUEST EXPLAINATION",
      videoID: null,
      requestDisabled: false,
      videoPlayer: null,
    };
  },
  methods: {
    getAnotherOne() {
      this.canRequestExplaination = true;
      this.requestExplainationText = "REQUEST EXPLAINATION";
      axios.get(host + "video").then((response) => {
        const id = response.data.id;
        this.videoID = id;
        this.videoSrc = host + "video/content/" + id;
        this.videoPlayer.load();
        this.explaination =
          response.data.explaination == ""
            ? "No Explaination Yet"
            : response.data.explaination;
        this.canRequestExplaination =
          !response.data.request_explaination &&
          response.data.explaination == "";
        if (response.data.explaination != "") {
          this.requestExplainationText = " ALREADY EXPLAINED ";
          this.canRequestExplaination = false;
        } else if (response.data.request_explaination) {
          this.requestExplainationText = "REQUEST ACKNOWLEDGED";
          this.canRequestExplaination = false;
        }
      });
    },
    requestExplaination() {
      axios.post(host + "video/request/" + this.videoID).then((response) => {
        if (response.data.success) {
          this.requestExplainationText = "REQUEST ACKNOWLEDGED";
          this.canRequestExplaination = false;
        }
      });
    },
    download() {
      axios({
        url: host + "video/content/" + this.videoID,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", this.videoID + ".mp4");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },
  },
  mounted() {
    this.videoPlayer = document.getElementById("videoPlayer");
    this.getAnotherOne();
  },
};
</script>

<style scoped>
#videoPlayer {
  height: 65vh;
  /*  position: fixed;
  object-fit: fill;*/
  /*min-height:  100vh;*/
}
</style>
