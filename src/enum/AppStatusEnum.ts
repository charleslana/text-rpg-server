enum AppStatusEnum {
    RouteNotFound = 'route.not.found',
    AccountUserAlreadyExists = 'account.user.already.exists',
    AccountEmailAlreadyExists = 'account.email.already.exists',
    AccountCreatedSuccess = 'account.created.success',
    AccountNotFound = 'account.not.found',
    AccountInvalidCredential = 'account.invalid.credential',
    AccountBanned = 'account.banned',
    AccessDenied = 'access.denied',
    CharacterNotFound = 'character.not.found',
    AccountCharacterCreatedSuccess = 'account.character.created.success',
    AccountCharacterNotFound = 'account.character.not.found',
    AccountCharacterNameAlreadyExists = 'account.character.name.already.exists',
    AccountCharacterMaxCharacterExceeded = 'account.character.max.character.exceeded',
    AccountCharacterDistributePointsSuccess = 'account.character.distribute.points.success',
    AccountCharacterDistributePointsInsufficient = 'account.character.distribute.points.insufficient',
}

export default AppStatusEnum;