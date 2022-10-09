'use babel';

import TommytomView from './tommytom-view';
import { CompositeDisposable } from 'atom';

export default {

  tommytomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.tommytomView = new TommytomView(state.tommytomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.tommytomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tommytom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.tommytomView.destroy();
  },

  serialize() {
    return {
      tommytomViewState: this.tommytomView.serialize()
    };
  },

  toggle() {
    console.log('Tommytom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
