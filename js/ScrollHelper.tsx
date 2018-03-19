import * as React from "react";
import * as classnames from "classnames";
import ImageTop from "../svg/top.svg";

interface Props {}

interface State {
  position: Position;
}

enum Position {
  TOP = "top",
  BOTTOM = "bottom",
  OTHER = "other"
}

class ScrollHelper extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { position: Position.OTHER };
  }

  scrollListener = () => {
    const { innerHeight, pageYOffset } = window;
    const { scrollTop, offsetHeight } = document.body;
    let position = Position.OTHER;
    if (scrollTop === 0) {
      position = Position.TOP;
    } else if (innerHeight + pageYOffset >= offsetHeight) {
      position = Position.BOTTOM;
    }
    const hasChanged = position !== this.state.position;
    if (hasChanged) {
      this.setState({ position });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.scrollListener, false);
    window.setTimeout(this.scrollListener, 0);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollListener);
  }

  // TODO: I want to use `MouseEvent` here but React barfs on that signature
  onClick = (event: any) => {
    event.preventDefault();
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };

  render() {
    const { position } = this.state;
    const shouldHide = position !== Position.OTHER;
    const size = 24;
    const img = <ImageTop width={size} height={size} />;
    const className = classnames("GoToTop", { "o-0": shouldHide });
    return (
      <a onClick={this.onClick} className={className} href="#">
        {img}
      </a>
    );
  }
}

export default ScrollHelper;
