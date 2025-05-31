import {AppColors, AppDimens, AppFonts} from '@/constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: AppColors.primaryGreen,
  },
  headerInfoContainer: {
    backgroundColor: AppColors.primaryGreen,
    paddingHorizontal: AppDimens.paddingXL,
    paddingTop: AppDimens.paddingXXL,
    paddingBottom: AppDimens.paddingXXL,
  },
  title: {
    fontSize: AppDimens.fontXL,
    color: AppColors.textDark,
    fontFamily: AppFonts.extraBold,
  },
  subtitle: {
    fontSize: AppDimens.fontLG,
    color: AppColors.textMedium,
    marginBottom: AppDimens.marginXXL,
    fontFamily: AppFonts.bold,
  },
  inputRow: {flexDirection: 'row', alignItems: 'center'},
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    paddingHorizontal: AppDimens.paddingLG,
    height: AppDimens.inputH,
    marginRight: AppDimens.marginMD,
    borderWidth: AppDimens.borderThin,
    borderColor: AppColors.borderDark,
  },
  inputError: {borderColor: AppColors.red},
  icon: {marginRight: AppDimens.marginMD},
  input: {
    flex: 1,
    fontSize: AppDimens.fontMD,
    color: AppColors.textDark,
  },
  button: {
    backgroundColor: AppColors.secondaryGreen,
    borderWidth: AppDimens.borderThin,
    borderColor: AppColors.borderDark,
    paddingHorizontal: AppDimens.paddingXL,
    height: AppDimens.btnH,
    width: AppDimens.btnW,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: AppColors.darkGreen,
    borderColor: AppColors.borderLight,
  },
  buttonContent: {flexDirection: 'row', alignItems: 'center'},
  buttonText: {
    color: AppColors.white,
    fontSize: AppDimens.fontMD,
    marginRight: AppDimens.marginMD,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: AppColors.red,
    marginTop: AppDimens.marginSM,
    fontSize: AppDimens.fontSM,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    paddingTop: AppDimens.paddingXL,
    paddingBottom: AppDimens.paddingXXL,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
