<template>
  <div>
    <v-container fluid>
      <v-img class="mt-10" :src="imgSrc" max-height="70vh" contain> </v-img>
      <div class="utils">
        <v-row>
          <v-col cols="10" md="8" sm="6" xs="6">
            <div class="explaination">
              <h2>Explaination:</h2>
              <h3>{{ imgExplaination }}</h3>
            </div>
          </v-col>
          <v-col cols="2" md="4" sm="6" xs="6">
            <v-row class="pt-2"
              ><v-btn
                block
                width="100%"
                class="output-button"
                color="rgb(10, 192, 144)"
                @click="getAnotherOne"
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
  name: "ImageViewer",
  data() {
    return {
      imgSrc: "",
      imgExplaination: "N/A",
      canRequestExplaination: false,
      requestExplainationText: "REQUEST EXPLAINATION",
      imgID: null,
      requestDisabled: false,
    };
  },
  methods: {
    getAnotherOne() {
      this.canRequestExplaination = true;
      this.requestExplainationText = "REQUEST EXPLAINATION";
      axios.get(host + "image").then((response) => {
        const id = response.data.id;
        this.imgID = id;
        this.imgSrc = host + "image/content/" + id;
        this.imgExplaination =
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
      axios.post(host + "image/request/" + this.imgID).then((response) => {
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
        link.setAttribute("download", this.imgID + ".JPG");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },
  },
  mounted() {
    this.getAnotherOne();
  },
};
</script>

<style scoped>
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
