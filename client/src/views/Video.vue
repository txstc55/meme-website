<template>
  <div>
    <v-container fluid>
      <video id="videoPlayer" controls>
        <source :src="videoSrc" type="video/mp4" />
      </video>
      <div class="utils">
        <v-row>
          <v-col cols="10" md="8" sm="6" xs="6">
            <div class="explaination">
              <h2>Explaination:</h2>
              <h3>{{ videoExplaination }}</h3>
            </div>
          </v-col>
          <v-col cols="2" md="4" sm="6" xs="6">
            <v-row class="pt-2"
              ><v-btn
                block
                width="100%"
                class="output-button"
                color="rgb(10, 192, 144)"
                @click="getNewImage"
                >ANOTHER ONE</v-btn
              ></v-row
            >
            <v-row class="pt-2"
              ><v-btn
                block
                width="100%"
                class="output-button"
                color="rgb(10, 192, 144)"
                @click="requestExplaination"
                :disabled="!canRequestExplaination"
                >{{ requestExplainationText }}</v-btn
              ></v-row
            >
            <v-row class="pt-2"
              ><v-btn
                block
                width="100%"
                class="output-button"
                color="rgb(10, 192, 144)"
                @click="download"
                >SAVE IT</v-btn
              ></v-row
            >
          </v-col>
        </v-row>
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
      videoExplaination: "N/A",
      canRequestExplaination: false,
      requestExplainationText: "REQUEST EXPLAINATION",
      videoID: null,
      requestDisabled: false,
      videoPlayer: null,
    };
  },
  methods: {
    getNewVideo() {
      this.canRequestExplaination = true;
      this.requestExplainationText = "REQUEST EXPLAINATION";
      axios.get(host + "video").then((response) => {
        const id = response.data.id;
        this.videoID = id;
        this.videoSrc = host + "video/content/" + id;
        this.videoPlayer.load();
        this.videoExplaination =
          response.data.explaination == "" ? "N/A" : response.data.explaination;
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
        url: host + "image/content/" + this.imgID,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", this.imgID + ".mp4");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },
  },
  mounted() {
    this.videoPlayer = document.getElementById("videoPlayer");
    this.getNewVideo();
  },
};
</script>

<style scoped>
#videoPlayer {
  height: 70vh;
/*  position: fixed;
  object-fit: fill;*/
  /*min-height:  100vh;*/
}
.utils {
  margin-left: 25%;
  margin-right: 25%;
  margin-top: 2vh;
  padding-left: 20px;
  height: 6vh;
}

.explaination {
  padding-right: 20px;
  text-align: left;
  border: 3px solid #cccccc;
  overflow-y: scroll;
  font-family: Tahoma, sans-serif;
  color: white;
  height: 6vh;
  font-size: 20px;
}

.outpout-button {
  font-weight: bold;
}

.output-button .v-btn__content {
  color: #182750;
}
.output-button .v-btn--disabled.v-btn__content {
  color: #b9e4a6;
}
</style>
