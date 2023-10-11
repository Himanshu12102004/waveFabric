import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Plane from '../helpers/Plane'
import { GUI } from 'dat.gui'
// Loading Textures

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.set(-9, 9, 1)
const gui = new GUI()
const planeFolder = gui.addFolder('Plane')
let planeAttributes = { height: 50, width: 20, heightSeg: 720, widthSeg: 50, amplitude: 1 }

const renderer = new THREE.WebGLRenderer()
renderer.setPixelRatio(devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.SphereGeometry()
const material = new THREE.MeshLambertMaterial({
    // color: 0x00ff00,
    wireframe: true,
    side: THREE.BackSide,
})
const changeGeometry = () => {
    plane.changeGeometry(planeAttributes)
}
const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)
const plane = new Plane(
    planeAttributes.height,
    planeAttributes.width,
    planeAttributes.heightSeg,
    planeAttributes.widthSeg
)
plane.rotateY(-Math.PI / 2)
plane.rotateX(Math.PI / 2)

// scene.add(new THREE.AxesHelper(10))
planeFolder.add(planeAttributes, 'height', 1, 500).onChange(() => {
    changeGeometry()
})
planeFolder.add(planeAttributes, 'width', 1, 500).onChange(() => {
    changeGeometry()
})
planeFolder.add(planeAttributes, 'heightSeg', 1, 500, 1).onChange(() => {
    changeGeometry()
})
planeFolder.add(planeAttributes, 'widthSeg', 1, 100, 1).onChange(() => {
    changeGeometry()
})
planeFolder.add(planeAttributes, 'amplitude', 0, 10, 0.1).onChange(() => {
    changeGeometry()
})
scene.add(plane)
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}
let frame = 0
function animate() {
    frame++
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    controls.update()
    plane.manipulate(frame)

    // plane.manipulate(frame * 0.01)
    render()
}
plane.manipulate(50)
function render() {
    renderer.render(scene, camera)
}
animate()
