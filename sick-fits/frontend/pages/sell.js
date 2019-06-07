import CreateItem from "../components/CreateItem";
import PleaseSignIn from '../components/PleaseSignIn';

export default class Sell extends React.Component {
  render() {
    return (
      <div>
        <PleaseSignIn>
          <CreateItem />
        </PleaseSignIn>
      </div>
    );
  }
}
