import { extensionClient } from '@/api';

export default function openURL(...urls) {
  extensionClient.talkToExtension({ cmd: 'CMD_OPEN_TABS', params: urls });
}
