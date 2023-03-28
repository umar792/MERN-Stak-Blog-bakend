const BlogModel = require("../Model/BlogSchema");



module.exports = {
    createBlog: async (req, res) => {
        try {
            const { title, discription, image, categorry } = req.body;
            if (!title || !discription || !image || !categorry) {
                return res.status(400).json({
                    success: false,
                    message: "Plaese fill all the fields"
                })
            }
            req.body.author = req.user._id;
            await BlogModel.create(req.body);
            res.status(200).json({
                success: true,
                message: "Blog created successfuly"
            })

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

    // ------------- single blog 

    SingleBlog: async (req, res) => {
        try {
            const blog = await BlogModel.findById(req.params.id).populate("author");
            if (!blog) {
                return res.status(400).json({
                    success: false,
                    message: `Blog not found at this id ${req.params.id}`
                })
            }
            res.status(200).json({
                success: true,
                blog
            })

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },


    // ----------- all blogs 
    Allblogs: async (req, res) => {
        try {
            const blogs = await BlogModel.find();
            res.status(200).json({
                success: true,
                blogs
            })

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

    // --------------- getUserBlog blog 
    getUserBlog: async (req, res) => {
        try {
            const user = req.user._id;
            const blogs = await BlogModel.find({ author: user });
            res.status(200).json({
                blogs
            })


        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

    // --------- delete blog 
    userDeleteBlog: async (req, res) => {
        try {
            const user = req.user._id;
            const blog = await BlogModel.findOne({ _id: req.params.id });
            if (blog && blog.author.toString() === user.toString()) {
                await BlogModel.deleteOne({ _id: req.params.id }); // Delete the blog
                res.status(200).json({
                    success: true,
                    message: "Blog deleted successfully"
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "You are not authorized to delete this blog"
                });
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },


    // -------------- admin delete blog 

    AdminDeleteBlog: async (req, res) => {
        try {
            const blog = await BlogModel.findByIdAndDelete(req.params.id);
            if (!blog) {
                return res.status(400).json({
                    success: false,
                    message: "Blog Not Found"
                })
            }
            res.status(200).json({
                success: true,
                message: "Blog Delete Successfuly"
            })

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

    // ------------ update blog 
    updateBlog: async (req, res) => {
        try {
            const { title, discription, categorry } = req.body;
            if (!title || !discription || !categorry) {
                return res.status(400).json({
                    success: false,
                    message: "Please fill all fileds"
                })
            }
            const blog = await BlogModel.findByIdAndUpdate(req.params.id, { title, discription, categorry }, { new: true });
            if (!blog) {
                return res.status(400).json({
                    success: false,
                    message: "Blog not found"
                })
            }
            res.status(200).json({
                success: true,
                message: "Blog Update successfuly"
            })


        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

}