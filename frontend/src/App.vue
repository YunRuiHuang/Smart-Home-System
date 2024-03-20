<template>
  <div class="f">

    <div class="header">
      <p id="title" class="title">title</p>
    </div>

    <div class="center">
      <div class="navigate">
        <div class="navigate-control">
          <!-- <img src="../img/X.jpg" alt="" style="height: 30px; width: 30px;"> -->
          <p>img</p>
        </div>

        <router-link to="/">
          <div class="navigate-label">
              <p>Home</p>
          </div>
        </router-link>

        <router-link to="/music">
          <div class="navigate-label">
              <p>Music</p>
          </div>
        </router-link>

        <router-link to="/house">
          <div class="navigate-label">
              <p>Home Status</p>
          </div>
        </router-link>

      </div>

      <div class="page">
        <router-view/>
      </div>

    </div>

    <div class="footer">
      <router-link to="/">| Homepage |</router-link>
      <br>
    </div>

  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  margin: 0;
}

html, body{
  height: 100%;
  margin: 0;
}

.f{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100%;
  width: 100%;
}

.header{
  text-align: center;
  width: 100%;
  height: 8%;
  border: 0;
  border-bottom: 2px;
  border-style: solid;
}

.center{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 90%;
  width: 100%;
  border: 0;
  border-bottom: 2px;
  border-style: solid;
}

.navigate{
  text-align: center;
  height: 100%;
  width: 15%;
  border: 0;
  border-right: 2px;
  border-style: solid;
}

.navigate-control{
  text-align: right;
  border: 0;
  border-bottom: 2px;
  border-style: solid;
}

.navigate-label{
  text-align: center;
  height: 50px;
  width: 100%;
  border: 0;
  border-bottom: 2px;
  border-style: solid;
}

.page{
  text-align: center;
  height: 100%;
  width: 85%;
}

.footer{
  text-align: center;
  height: auto;
  width: 100%;
}

@media(max-width:600px) {
  .center{
    flex-direction: column;
    overflow: scroll;
  }

  .navigate{
    text-align: center;
    height: auto;
    width: 100%;
    border: 0;
  }

  .navigate-label{
    height: 100px;
  }

  .page{
    height: auto;
    width: 100%;
  }

}

</style>
