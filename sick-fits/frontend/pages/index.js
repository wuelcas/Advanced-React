import Link from "next/link";
import Items from "../components/Items";

export default class Home extends React.Component {
  render() {
    return <div>
      <Items page={parseInt(this.props.query.page)} />
    </div>;
  }
}
