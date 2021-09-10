import React, { useState } from 'react';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import { SpeedDialAction } from '@material-ui/lab';
import { Icon } from '@iconify/react';
import manageAccounts from '@iconify/icons-ic/baseline-manage-accounts';
import ExtensionIcon from '@material-ui/icons/Extension';
import SpeedDial from '@material-ui/lab/SpeedDial';
import { FabWrapper } from '../../../components/FabWrapper';
import { useNavigationHelpers } from '../../../hooks/useNavigationHelpers';
import styled from 'styled-components';
import { useAddIntegrationModal } from './IntegrationsDialog';

const IconStyled = styled(Icon)`
  margin-left: 2px;
`;

const ExtensionIconStyled = styled(ExtensionIcon)`
  margin-left: 2px;
`;

export const AddActivityFab: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { goForwardToCb } = useNavigationHelpers();
  const { openModal } = useAddIntegrationModal();

  return (
    <FabWrapper>
      <SpeedDial
        ariaLabel="Add new activity"
        icon={<SpeedDialIcon />}
        onClose={() => setIsMenuOpen(false)}
        onOpen={() => setIsMenuOpen(true)}
        open={isMenuOpen}
      >
        <SpeedDialAction
          icon={<IconStyled icon={manageAccounts} width={26} />}
          tooltipTitle="Activity"
          tooltipOpen
          onClick={goForwardToCb('ActivityCreate')}
        />
        <SpeedDialAction
          icon={<ExtensionIconStyled />}
          tooltipTitle="Integration"
          tooltipOpen
          onClick={() => openModal()}
        />
      </SpeedDial>
    </FabWrapper>
  );
};
