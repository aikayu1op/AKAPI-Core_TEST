export class Camera{
    /**
     * @private
     */
    _camera;

    /**
     * 
     * @param {import("../../").Player} player 
     */
    constructor(player){
        this._camera = player.getMCPlayer().camera;
    }
    /**
     * @remarks
     * Clears the active camera for the specified player. Causes
     * the specified players to end any in-progress camera
     * perspectives, including any eased camera motions, and return
     * to their normal perspective.
     *
     * This function can't be called in read-only mode.
     *
     * @throws This function can throw errors.
     */
    clear(){
        this._camera.clear();
    }
    /**
     * @remarks
     * Begins a camera fade transition. A fade transition is a
     * full-screen color that fades-in, holds, and then fades-out.
     *
     * This function can't be called in read-only mode.
     *
     * @param {CameraFadeOptions} fadeCameraOptions
     * Additional options around camera fade operations.
     * @throws This function can throw errors.
     */
    fade(fadeCameraOptions = undefined){
        this._camera.fade(fadeCameraOptions);
    }
    /**
     * @remarks
     * Sets the current active camera for the specified player.
     *
     * This function can't be called in read-only mode.
     *
     * @param {string} cameraPreset
     * Identifier of a camera preset file defined within JSON.
     * @param {CameraDefaultOptions | CameraSetFacingOptions | CameraSetLocationOptions | CameraSetPosOptions| CameraSetRotOptions} setOptions
     * Additional options for the camera.
     * @throws This function can throw errors.
     */
    setCamera(cameraPreset,setOptions = undefined){
        this._camera.setCamera(cameraPreset, setOptions);
    }
}