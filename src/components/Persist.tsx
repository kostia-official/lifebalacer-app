import React, { Fragment } from 'react';

export interface IPersistProps<T extends object> {
  data: T;
  onMount: (data: T) => void;
  name: string;
}

export class Persist<T extends object> extends React.Component<IPersistProps<T>> {
  componentDidMount() {
    const data = window.localStorage.getItem(this.props.name) || '{}';

    this.props.onMount(JSON.parse(data));
  }

  componentDidUpdate(prevProps: IPersistProps<T>) {
    const data = JSON.stringify(this.props.data);
    const prevData = JSON.stringify(prevProps.data);

    if (data !== prevData) {
      const data = JSON.stringify(this.props.data);

      window.localStorage.setItem(this.props.name, data);
    }
  }

  render() {
    return <Fragment />;
  }
}
