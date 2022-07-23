import { useEffect, createContext, useContext } from "react";
import * as AuthSession from "expo-auth-session";

import { Alert, Platform } from "react-native";

export const TokenContext = createContext({
	token: '',
	setToken: (nToken) => {}
});

const auth0ClientId = 'Yg1JRsLDpaPxOtY09ReACGpOjwRQBNK2';
const authorizationEndpoint = 'https://uberglobalhack.us.auth0.com/authorize';

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

export default function useAccount() {

	const { setToken } = useContext(TokenContext);

	const [ request, result, promptAsync ] = AuthSession.useAuthRequest(
		{
			redirectUri,
			clientId: auth0ClientId,
			// id_token will return a JWT token
			responseType: 'id_token',
			// retrieve the user's profile
			scopes: ['openid', 'profile'],
			extraParams: {
				// ideally, this will be a random value
				nonce: 'nonce123456789',
			},
		},
		{ authorizationEndpoint }
	);

	let promptSignin = () => promptAsync({ useProxy });

	useEffect(() => {
		if (result) {
			if (result.error) {
				Alert.alert(
					"Authentication error",
					result.params.error_description || "something went wrong"
				);
				return;
			}
				if (result.type === "success") {
				const jwtToken = result.params.id_token;
				Alert.alert(
					"Authentication Success",
					jwtToken
				);

				setToken(jwtToken);
			}
		}
	}, [ result ]);

	return { promptSignin };
}