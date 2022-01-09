import * as React from 'react';
import { FC, PropsWithChildren } from 'react'
import {DarkModeContextProvider} from './darkModeContext';
import {ProviderUniter} from './providerUniter';

const providers = [
    DarkModeContextProvider
] 

export const MainProvider: FC<PropsWithChildren<{}>> = ({children}) => <ProviderUniter providers={providers}>{children}</ProviderUniter>
