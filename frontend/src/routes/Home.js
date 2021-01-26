import React from 'react';
import axios from 'axios';

class Home extends React.Component {
  state = {
    time: ""
  }

  getTime = async() => {
    const {
      data
    } = await axios.get("v1/test");
    console.log(data);
    this.setState({time: data})
  }

  componentDidMount() {
    this.getTime();
    console.log(this.state)
  }

  render() {
    const { time } = this.state;
    
    return (
      <section className="main__home">
        <div className="test__time">
          test time : {time}
        </div>
      </section>
    );
  }
}


export default Home;
