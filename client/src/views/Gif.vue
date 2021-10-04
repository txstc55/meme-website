<template>
  <div>
    <v-container fluid>
      <v-img class="" :src="fileSrc" max-height="65vh" contain> </v-img>
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
const host = "http://meme4meme.me/api/";
import axios from "axios";
export default {
  name: "GifViewer",
  data() {
    return {
      fileSrc: "",
      explaination: "No Explaination Yet",
      canRequestExplaination: false,
      requestExplainationText: "REQUEST EXPLAINATION",
      fileID: null,
      requestDisabled: false,
    };
  },
  methods: {
    getAnotherOne() {
      this.canRequestExplaination = true;
      this.requestExplainationText = "REQUEST EXPLAINATION";
      axios.get(host + "gif").then((response) => {
        const id = response.data.id;
        this.$router.push({ name: "Gif with ID", params: { id: id } });
      });
    },
    getSpecificOne() {
      this.canRequestExplaination = true;
      this.requestExplainationText = "REQUEST EXPLAINATION";
      axios.get(host + "gif/" + this.$route.params.id).then((response) => {
        const id = response.data.id;
        if (id == this.$route.params.id) {
          this.fileID = id;
          this.fileSrc = host + "gif/content/" + id;
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
        } else {
          this.$router.push({ name: "Gif with ID", params: { id: id } });
        }
      });
    },
    getOne() {
      if (this.$route.params.id == undefined) {
        this.getAnotherOne();
      } else {
        this.getSpecificOne();
      }
    },
    requestExplaination() {
      axios.post(host + "gif/request/" + this.fileID).then((response) => {
        if (response.data.success) {
          this.requestExplainationText = "REQUEST ACKNOWLEDGED";
          this.canRequestExplaination = false;
        }
      });
    },
    download() {
      axios({
        url: host + "gif/content/" + this.fileID,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", this.fileID + ".gif");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },
  },
  watch: {
    $route() {
      this.getOne();
    },
  },
  mounted() {
    this.getOne();
  },
};
</script>
