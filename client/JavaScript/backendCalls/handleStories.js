var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Stories_instances, _Stories_backendUrl, _Stories_readJson, _Stories_addToStoryArray;
import { Story } from './story.js';
class Stories {
    constructor(backendUrl) {
        _Stories_instances.add(this);
        _Stories_backendUrl.set(this, "");
        this.getStories = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                fetch(__classPrivateFieldGet(this, _Stories_backendUrl, "f"))
                    .then(response => response.json())
                    .then(response => {
                    __classPrivateFieldGet(this, _Stories_readJson, "f").call(this, response);
                    resolve(this.stories); //returns an array of stories
                })
                    .catch(error => {
                    reject(error);
                });
            }));
        });
        this.getStoryById = (id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                fetch(__classPrivateFieldGet(this, _Stories_backendUrl, "f") + "/" + id)
                    .then(response => response.json())
                    .then(response => {
                    resolve(response); //returns a single story
                })
                    .catch(error => {
                    reject(error);
                });
            }));
        });
        _Stories_readJson.set(this, (allStories) => {
            allStories.forEach((story) => {
                this.stories.push(new Story(story.author, story.title, story.story, story.blog_date, story.blog_image));
            });
        });
        this.stories = [];
        __classPrivateFieldSet(this, _Stories_backendUrl, backendUrl, "f");
    }
}
_Stories_backendUrl = new WeakMap(), _Stories_readJson = new WeakMap(), _Stories_instances = new WeakSet(), _Stories_addToStoryArray = function _Stories_addToStoryArray(author, title, stoory, blog_date, blog_image) {
    const story = new Story(author, title, stoory, blog_date, blog_image);
    this.stories.push(story);
    return story;
};
export { Stories };