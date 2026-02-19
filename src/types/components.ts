export interface Component {
  cleanup?: () => void;
}

export interface NoteComponent extends Component, HTMLDivElement {}
