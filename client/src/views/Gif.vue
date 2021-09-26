<template>
  <div>
    <v-container fluid>
      <v-img class="mt-10" :src="gifSrc" max-height="70vh" contain> </v-img>
      <div class="utils">
        <v-row>
          <v-col cols="10" md="8" sm="6" xs="6">
            <div class="explaination">
              <h2>Explaination:</h2>
              <h3>{{ gifExplaination }}</h3>
            </div>
          </v-col>
          <v-col cols="2" md="4" sm="6" xs="6">
            <v-row class="mt-3"
              ><v-btn
                block
                width="100%"
                class="output-button"
                color="rgb(10, 192, 144)"
                @click="getNewGif"
                >ANOTHER ONE</v-btn
              ></v-row
            >
            <v-row class="mt-8"
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
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
const host = "http://localhost:5001/";
import axios from "axios";
export default {
  name: "GifViewer",
  data() {
    return {
      gifSrc: "",
      gifExplaination: "N/A",
      canRequestExplaination: false,
      requestExplainationText: "REQUEST EXPLAINATION",
      gifID: null,
      requestDisabled: false,
    };
  },
  methods: {
    getNewGif() {
      this.canRequestExplaination = true;
      this.requestExplainationText = "REQUEST EXPLAINATION";
      axios.get(host + "gif").then((response) => {
        const id = response.data.id;
        this.gifID = id;
        this.gifSrc = host + "gif/content/" + id;
        this.gifExplaination =
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
      axios.post(host + "gif/request/" + this.gifID).then((response) => {
        if (response.data.success) {
          this.requestExplainationText = "REQUEST ACKNOWLEDGED";
          this.canRequestExplaination = false;
        }
      });
    },
  },
  mounted() {
    this.getNewGif();
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
