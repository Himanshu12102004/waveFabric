import * as THREE from 'three'
class Plane extends THREE.Mesh {
    public height: number
    public width: number
    public widthSeg: number
    public heightSeg: number
    public amplitude: number
    constructor(height: number, width: number, heightSeg: number, widthSeg: number) {
        super(
            new THREE.PlaneGeometry(width, height, widthSeg, heightSeg),
            new THREE.MeshNormalMaterial({ wireframe: true, side: THREE.DoubleSide })
        )
        this.width = width
        this.height = height
        this.heightSeg = heightSeg
        this.widthSeg = widthSeg
        this.amplitude = 1
    }
    manipulate(frame: number) {
        const { array } = this.geometry.attributes.position
        for (let i = Math.round(this.heightSeg / 2), k = 0; i <= this.heightSeg; i++, k++) {
            for (let j = 0; j <= this.widthSeg; j++) {
                array[i * (this.widthSeg + 1) * 3 + j * 3 + 2] =
                    this.amplitude * Math.sin(frame / 100) * Math.sin((frame - k * Math.PI) / 50)
            }
        }
        for (let i = Math.round(this.heightSeg / 2), k = 0; i >= 0; i--, k--) {
            for (let j = 0; j <= this.widthSeg; j++) {
                array[i * (this.widthSeg + 1) * 3 + j * 3 + 2] =
                    this.amplitude * Math.sin(frame / 100) * Math.sin((frame - k * Math.PI) / 50)
            }
        }

        this.geometry.attributes.position.needsUpdate = true
    }

    changeGeometry(planeAttributes: {
        width: number
        height: number
        widthSeg: number
        heightSeg: number
        amplitude: number
    }) {
        this.geometry.dispose()
        this.width = planeAttributes.width
        this.height = planeAttributes.height
        this.heightSeg = planeAttributes.heightSeg
        this.widthSeg = planeAttributes.widthSeg
        this.amplitude = planeAttributes.amplitude
        this.geometry = new THREE.PlaneGeometry(
            planeAttributes.width,
            planeAttributes.height,
            planeAttributes.widthSeg,
            planeAttributes.heightSeg
        )
    }
}
export default Plane
