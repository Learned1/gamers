namespace SpriteKind {
    export const Accessorie = SpriteKind.create()
    export const Gui = SpriteKind.create()
    export const Npc = SpriteKind.create()
}
namespace StatusBarKind {
    export const Progress = StatusBarKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    timer.throttle("action", 500, function () {
        if (BreachSelect || Breaching) {
            BreachSelect = false
            MovementOveride = false
            ProgressOverride = true
            PlayerGui[1].setImage(assets.image`LockPick`)
            PlayerGui[2].setImage(assets.image`Drill`)
            PlayerGui[3].setImage(assets.image`Crowbar`)
            timer.after(500, function () {
                ProgressOverride = false
                progress.value = progress.max
            })
        }
    })
})
function Load () {
    Hitbox = sprites.create(assets.image`Player0`, SpriteKind.Player)
    // 0 Lockpick Speed
    // 1 Drill Speed
    // 2 Health
    PlayerSkills = [1, 1, 1]
    Clothes = []
    progress = statusbars.create(4, 40, StatusBarKind.Progress)
    progress.setColor(1, 0, 1)
    progress.setBarBorder(1, 15)
    progress.positionDirection(CollisionDirection.Right)
    progress.setOffsetPadding(-15, 2)
    progress.setFlag(SpriteFlag.Invisible, true)
    PlayerGui = [sprites.create(assets.image`PlayerGui0`, SpriteKind.Gui)]
    MovementOveride = false
    PlayerGui[0].z = 5
    PlayerGui[0].setFlag(SpriteFlag.RelativeToCamera, true)
    Hitbox.setFlag(SpriteFlag.Invisible, true)
    PlayerGui.push(sprites.create(assets.image`LockPick`, SpriteKind.Gui))
    PlayerGui.push(sprites.create(assets.image`Drill`, SpriteKind.Gui))
    PlayerGui.push(sprites.create(assets.image`Crowbar`, SpriteKind.Gui))
    PlayerGui.push(sprites.create(assets.image`XDGui_Hair`, SpriteKind.Gui))
    PlayerGui.push(sprites.create(assets.image`DevGui_shirt`, SpriteKind.Gui))
    PlayerGui[4].setFlag(SpriteFlag.RelativeToCamera, true)
    PlayerGui[4].z = 5
    PlayerGui[5].setFlag(SpriteFlag.RelativeToCamera, true)
    PlayerGui[5].z = 5
    PlayerGui[1].setFlag(SpriteFlag.Invisible, true)
    PlayerGui[1].setFlag(SpriteFlag.Ghost, true)
    PlayerGui[2].setFlag(SpriteFlag.Ghost, true)
    Clothes.push(sprites.create(assets.image`PlayerV2`, SpriteKind.Accessorie))
    Clothes.push(sprites.create(assets.image`PlayerV0`, SpriteKind.Accessorie))
    Clothes.push(sprites.create(assets.image`Shirt_Dev`, SpriteKind.Accessorie))
    Clothes.push(sprites.create(assets.image`Pants_Dev`, SpriteKind.Accessorie))
    tiles.placeOnTile(Hitbox, tiles.getTileLocation(20, 24))
}
// Change to C
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    timer.throttle("action", 250, function () {
        if (BreachSelect) {
            if (BreachMenuSelected == 1) {
                MovementOveride = true
                Breaching = true
                progress.setFlag(SpriteFlag.Invisible, false)
                progress.max = 16
                timer.background(function () {
                    for (let index = 0; index < 16; index++) {
                        pause(500)
                        progress.value += -1
                        if (ProgressOverride) {
                            break;
                        }
                    }
                })
                timer.after(8000 * PlayerSkills[0], function () {
                    console.log("Breached")
                    if (Hitbox.tileKindAt(TileDirection.Left, assets.tile`Door`)) {
                        tiles.setWallAt(tiles.locationInDirection(tiles.locationOfSprite(Hitbox), CollisionDirection.Left), false)
                    } else if (Hitbox.tileKindAt(TileDirection.Right, assets.tile`Door`)) {
                        tiles.setWallAt(tiles.locationInDirection(tiles.locationOfSprite(Hitbox), CollisionDirection.Right), false)
                    } else if (Hitbox.tileKindAt(TileDirection.Top, assets.tile`Door`)) {
                        tiles.setWallAt(tiles.locationInDirection(tiles.locationOfSprite(Hitbox), CollisionDirection.Top), false)
                    } else if (Hitbox.tileKindAt(TileDirection.Bottom, assets.tile`Door`)) {
                        tiles.setWallAt(tiles.locationInDirection(tiles.locationOfSprite(Hitbox), CollisionDirection.Bottom), false)
                    }
                    progress.value = progress.max
                    MovementOveride = false
                    Breaching = false
                })
            } else if (BreachMenuSelected == 2) {
            	
            } else if (BreachMenuSelected == 3) {
            	
            }
            BreachSelect = false
            PlayerGui[1].setImage(assets.image`LockPick`)
            PlayerGui[2].setImage(assets.image`Drill`)
            PlayerGui[3].setImage(assets.image`Crowbar`)
        } else {
            if (BreachMenuActive) {
                BreachSelect = true
                BreachMenuSelected = 1
            }
        }
    })
})
function Movement (Overide: boolean, Speed: number) {
    if (Overide) {
    	
    } else {
        if (controller.anyButton.isPressed()) {
            if (controller.left.isPressed()) {
                Hitbox.vx = Speed * -1
            } else if (controller.right.isPressed()) {
                Hitbox.vx = Speed * 1
            }
            if (controller.up.isPressed()) {
                Hitbox.vy = Speed * -1
            } else if (controller.down.isPressed()) {
                Hitbox.vy = Speed * 1
            }
        } else {
            if (Overide) {
            	
            } else {
                Hitbox.setVelocity(0, 0)
            }
        }
    }
}
sprites.onCreated(SpriteKind.Accessorie, function (sprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
})
function CameraController (Setup: boolean) {
    if (Setup) {
    	
    } else {
        scene.cameraFollowSprite(Hitbox)
        GlobalCamera = true
    }
}
function Breachmenu (Lvl: number) {
    MovementOveride = true
    if (controller.up.isPressed()) {
        timer.throttle("action", 200, function () {
            if (BreachMenuSelected == 3) {
                BreachMenuSelected = 1
            } else {
                BreachMenuSelected += 1
            }
        })
    } else if (controller.down.isPressed()) {
        timer.throttle("action", 200, function () {
            if (BreachMenuSelected == 1) {
                BreachMenuSelected = 3
            } else {
                BreachMenuSelected += -1
            }
        })
    }
    if (BreachMenuSelected == 1) {
        PlayerGui[1].setImage(assets.image`LockPick0`)
        PlayerGui[2].setImage(assets.image`Drill`)
        PlayerGui[3].setImage(assets.image`Crowbar`)
    } else if (BreachMenuSelected == 2) {
        PlayerGui[1].setImage(assets.image`LockPick`)
        PlayerGui[2].setImage(assets.image`Drill0`)
        PlayerGui[3].setImage(assets.image`Crowbar`)
    } else if (BreachMenuSelected == 3) {
        PlayerGui[1].setImage(assets.image`LockPick`)
        PlayerGui[2].setImage(assets.image`Drill`)
        PlayerGui[3].setImage(assets.image`Crowbar0`)
    }
}
function LevelTick (Lvl: number) {
    if (Lvl == 0) {
        if (Hitbox.tileKindAt(TileDirection.Center, assets.tile`Stair`)) {
            timer.throttle("ChangeLvl", 300, function () {
                timer.after(0.5, function () {
                    tiles.placeOnTile(Hitbox, tiles.getTileLocation(5, 5))
                })
                Level(0.1)
            })
        }
        if (Hitbox.tileKindAt(TileDirection.Right, assets.tile`Door`) || Hitbox.tileKindAt(TileDirection.Left, assets.tile`Door`) || Hitbox.tileKindAt(TileDirection.Bottom, assets.tile`Door`) || Hitbox.tileKindAt(TileDirection.Top, assets.tile`Door`)) {
            PlayerGui[1].setFlag(SpriteFlag.Invisible, false)
            PlayerGui[2].setFlag(SpriteFlag.Invisible, false)
            PlayerGui[3].setFlag(SpriteFlag.Invisible, false)
            PlayerGui[1].setPosition(Hitbox.x - 18, Hitbox.y - 9)
            PlayerGui[2].setPosition(Hitbox.x - 18, Hitbox.y - 26)
            PlayerGui[3].setPosition(Hitbox.x - 18, Hitbox.y - 43)
            BreachMenuActive = true
        } else {
            BreachMenuActive = false
            PlayerGui[1].setPosition(0, 0)
            PlayerGui[2].setPosition(0, 0)
            PlayerGui[3].setPosition(0, 0)
            PlayerGui[1].setFlag(SpriteFlag.Invisible, true)
            PlayerGui[2].setFlag(SpriteFlag.Invisible, true)
            PlayerGui[3].setFlag(SpriteFlag.Invisible, true)
        }
    }
    if (Lvl == 0.1) {
        if (Hitbox.tileKindAt(TileDirection.Center, assets.tile`Stair`)) {
            timer.throttle("ChangeLvl", 300, function () {
                timer.after(0.5, function () {
                    tiles.placeOnTile(Hitbox, tiles.getTileLocation(8, 5))
                })
                Level(0)
            })
        }
    }
}
function Level (Lvl: number) {
    if (Lvl == 0) {
        tiles.setTilemap(tilemap`level1`)
        scene.setBackgroundColor(7)
        GlobalLevel = Lvl
    }
    if (Lvl == 0.1) {
        tiles.setTilemap(tilemap`level3`)
        scene.setBackgroundColor(6)
        GlobalLevel = Lvl
    }
}
let GlobalLevel = 0
let GlobalCamera = false
let BreachMenuActive = false
let BreachMenuSelected = 0
let Clothes: Sprite[] = []
let PlayerSkills: number[] = []
let Hitbox: Sprite = null
let progress: StatusBarSprite = null
let PlayerGui: Sprite[] = []
let ProgressOverride = false
let MovementOveride = false
let Breaching = false
let BreachSelect = false
Level(0)
Load()
game.onUpdate(function () {
    for (let value of Clothes) {
        value.setPosition(Hitbox.x, Hitbox.y)
    }
})
game.onUpdate(function () {
    Movement(MovementOveride, 50)
    LevelTick(GlobalLevel)
    CameraController(GlobalCamera)
    if (BreachSelect) {
        Breachmenu(GlobalLevel)
    }
})
