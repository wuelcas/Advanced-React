import UpdateItem from "../components/UpdateItem";

export default class Update extends React.Component {
  render() {
    return (
      <div>
        <UpdateItem id={this.props.query.id} />
      </div>
    );
  }
}
